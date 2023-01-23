from dis import dis
import logging
import time
import uuid
import hashlib
from flask import jsonify

import pandas as pd
from flask_restful import reqparse
from config.dglosconfigs import discarded_response_data, cron_interval

from utils.dglosutils import DGlosUtils
from repository.dglosrepo import DGlosRepo
from repository.userrepo import UserRepo
from config.dglosconfigs import phrase_length_in_words
from utils.dglosvalidator import DGlosValidator

dds_utils = DGlosUtils()
dglos_repo = DGlosRepo()
user_repo = UserRepo()

parser = reqparse.RequestParser(bundle_errors=True)
log = logging.getLogger("file")


class DGlosService:
    def __init__(self):
        pass

    def run(self):
        run = 0
        while not self.stopped.wait(cron_interval):
            try:
                log.info(f"cron run for ds count notify")
                self.notify_user()
                run += 1
            except Exception as e:
                log.info(f"error {e}")

    # Method to create glossary , upload api will internally call this method
    def create(self, data):
        hash_object = DGlosService()
        req_id = data["metadata"]["requestId"]
        log.info(f"{req_id} | Uploading Glossary...")
        try:
            glossary = []
            for glossary_entry in data["glossary"]:
                glossary_entry["hash"] = hash_object.create_hash(glossary_entry)
                glossary_entry["count"] = 0
                audit = {
                    "createdTime": eval(str(time.time()).replace(".", "")[0:13]),
                    "glossaryId": str(uuid.uuid4()),
                }
                glossary_entry["audit"] = audit
                glossary.append(glossary_entry)
            log.info(f"{req_id} | Pushing to the backup store...")
            dglos_repo.insert_bulk(glossary)
            log.info(f"{req_id} | Pushing to ES...")
            for glos in glossary:
                del glos["_id"]
                dglos_repo.index_basic_to_es(glos)
            log.info(f"{req_id} | Upload Complete!")
            return {"status": "Success", "message": "Glossary Uploaded!"}
        except Exception as e:
            log.exception("Glossary upload failed!", e)
            return {"status": "FAILED", "message": "Glossary Upload FAILED!"}

    # This method is used to create hash , which is maintained as unique key across both mongo and ES
    def create_hash(self, data):
        source = data["srcText"]
        target = data["tgtText"]
        s_Lang = data["srcLanguage"]
        t_Lang = data["tgtLanguage"]
        full = source + target + s_Lang + t_Lang
        hash = hashlib.md5(full.encode("utf-16")).hexdigest()
        return hash

    # This method is used to read the bulk file and then create glossary for all the individual records inside it.
    def upload_file(self, api_request, data):
        validator = DGlosValidator()
        req_id = data["metadata"]["requestId"]
        log.info(f"{req_id} | Uploading Glossary File...")
        try:
            f = api_request.files["glossaryFile"]
            g = api_request.files["glossaryFile"].filename
            extension = g.split(".")[-1]
            if extension in ["xlsx", "xls"]:
                data_xls = pd.read_excel(f, keep_default_na=False)
            elif extension == "csv":
                data_xls = pd.read_csv(f, encoding="utf-8", keep_default_na=False)
            elif extension == "tsv":
                data_xls = pd.read_csv(
                    f, encoding="utf-8", sep="\t", keep_default_na=False
                )
            data["glossary"] = data_xls.to_dict(orient="records")

            validation_response = validator.validate_glossary(data)
            if type(validation_response) != list:
                return {"status": "FAILED", "ERROR": validation_response}
            try:
                clean_data = {
                    "metadata": data["metadata"],
                    "glossary": validation_response,
                }
            except Exception as e:
                log.exception("Something went wrong in uploaded file: " + str(e), e)
                return {"status": "FAILED", "message": "error: " + str(e)}

            upload_successful = self.create(clean_data)
            total_count = len(data["glossary"])
            passed_count = len(clean_data["glossary"])
            if upload_successful:
                if upload_successful["status"] == "Success":
                    log.info(f"{req_id} | Upload Complete!")
                    return {
                        "status": "Success",
                        "message": f"{passed_count} ingested out of {total_count}",
                    }
            return {"status": "FAILED", "message": "Glossary Upload FAILED!"}
        except Exception as e:
            log.exception("File upload failed!", e)
            return {"status": "FAILED", "message": "Glossary File Upload FAILED!"}

    # This method is used to search the glossaries from elastic search db
    def search_glossary(self, data, search_query_dict):
        req_id, result = data["metadata"]["requestId"], []
        for input in data["inputs"]:
            log.info(f"{req_id} | Searching Glossary for phrases in: {input}")
            glossary_phrases = self.glossary_phrase_search(input, search_query_dict)
            for i in range(0, len(glossary_phrases)):
                for key in discarded_response_data:
                    del glossary_phrases[i][key]

            if glossary_phrases:
                log.info(
                    f"{req_id} | sentence: {input} | compute_details: {glossary_phrases}"
                )

            result.append({"input": input, "glossaryPhrases": glossary_phrases})
        return result

    # Searches for all glossary phrases of a fixed length within a given sentence
    # Uses a custom implementation of the sliding window search algorithm.
    def glossary_phrase_search(self, sentence, search_query_dict):
        glossary_phrases = []
        hopping_pivot, sliding_pivot, i = 0, len(sentence), 1
        computed, glos_count = 0, 0
        try:
            while hopping_pivot < len(sentence):
                phrase = sentence[hopping_pivot:sliding_pivot]
                phrase_size = phrase.split(" ")
                if len(phrase_size) <= phrase_length_in_words:
                    suffix_phrase_list, found = [phrase], False
                    if phrase.endswith(".") or phrase.endswith(","):
                        short = phrase.rstrip(".,")
                        suffix_phrase_list.append(short)
                    for phrase in suffix_phrase_list:
                        search_query_dict["srcText"] = phrase
                        result = self.search_from_es_store(search_query_dict)
                        computed += 1
                        if result:
                            glossary_phrases.extend(result)
                            phrase_list = phrase.split(" ")
                            hopping_pivot += 1 + len(" ".join(phrase_list))
                            sliding_pivot = len(sentence)
                            i = 1
                            glos_count += 1
                            found = True
                            break
                    if found:
                        continue
                sent_list = sentence.split(" ")
                phrase_list = phrase.split(" ")
                reduced_phrase = " ".join(sent_list[0 : len(sent_list) - i])
                sliding_pivot = len(reduced_phrase)
                i += 1
                if (
                    hopping_pivot == sliding_pivot
                    or (hopping_pivot - 1) == sliding_pivot
                ):
                    hopping_pivot += 1 + len(" ".join(phrase_list))
                    sliding_pivot = len(sentence)
                    i = 1
        except Exception as e:
            log.exception(f"Exception while computing phrases: {e}", e)
        return glossary_phrases

    # This method takes query for search glossary
    def search_from_store(self, data):
        query = {}
        if "srcText" in data.keys():
            query["srcText"] = data["srcText"]
        if "domain" in data.keys():
            query["domain"] = data["domain"]
        if "collectionSource" in data.keys():
            query["collectionSource"] = data["collectionSource"]
        result = dglos_repo.search_db(query, {"_id": False}, None, None)
        return result

    # This method searches glossary from elastic search based on query
    def search_from_es_store(self, search_query_dict):
        result = dglos_repo.search_basic_from_es(search_query_dict)
        return result
