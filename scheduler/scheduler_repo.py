from flask import json
import os
import sys
from repository.dglosrepo import DGlosRepo
from config.dglosconfigs import dglos_collection , supported_languages

class count:
    def __init__(self) -> None:
        pass

    def data_count():
        count = DGlosRepo()
        domain = count.count_from_db("domain")
        collection_source = count.count_from_db("collectionSource")
        domain_list = list(domain)
        collection_source_list = list(collection_source)
        domains = []
        collection_sources = []
        total_count_domain = 0
        total_count_collectionSource = 0
        for item in domain_list:
            diction = item["_id"]
            diction["count"] = item["count"]
            domains.append(diction)
            total_count_domain += item["count"]
        domain_count = {"domains": domains, "totalCount": total_count_domain}
        for item in collection_source_list:
            diction = item["_id"]
            diction["count"] = item["count"]
            collection_sources.append(diction)
            total_count_collectionSource += item["count"]
        collectionSource_count = {
            "CollectionSources": collection_sources,
            "totalCount": total_count_collectionSource,
        }
        result = (domain_count, collectionSource_count)
        json_object = json.dumps(result)
        with open('models/count_by_domainandsource.json', 'w') as f:
                f.write(json_object)


    def lang_count():
        count = DGlosRepo()
        lang = count.count_by_lang("srcLanguage", "tgtLanguage")
        lang_list = list(lang)
        languages = []
        totalcount = 0
        with open(supported_languages, "r") as f:
            data = json.load(f)
        for item in lang_list:
            language_code = item["_id"]["tgtLanguage"]
            lang_full_name = " "
            for i in data["languages"]:
                if i["code"] == language_code:
                    lang_full_name = i["label"]
                    break
            temp = {}
            temp["srcLanguage"] = item["_id"]["srcLanguage"]
            temp["tgtLanguage"] = item["_id"]["tgtLanguage"]
            temp["count"] = item["count"]
            temp["label"] = lang_full_name
            languages.append(temp)
            totalcount += item["count"]
        final = {"languages": languages, "totalcount": totalcount}
        json_object = json.dumps(final)
        with open('models/count_by_langaugepair.json', 'w') as f:
                f.write(json_object)

  