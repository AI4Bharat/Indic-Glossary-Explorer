import logging
import json
from bson import json_util
import time
from datetime import datetime

import pymongo
from elasticsearch import Elasticsearch

from config.dglosconfigs import db_cluster, db, dglos_collection, es_url, base_index,review_collection
from repository.userrepo import UserRepo

log = logging.getLogger("file")

mongo_instance = None
es_instance = None
mongo_review_instance = None


class DGlosRepo:
    def __init__(self):
        pass

    # Initialises and fetches mongo db client
    def mongodb_conn_instantiate(self):
        global mongo_instance
        client = pymongo.MongoClient(db_cluster)
        mongo_instance = client[db][dglos_collection]
        mongo_review_instance=client[db][review_collection]
        return [mongo_instance,mongo_review_instance]

    # Method to instantiate the elasticsearch client.
    def instantiate_es_client(self):
        global es_instance
        es_client = Elasticsearch([es_url])
        return es_client

    def get_mongodb_connection(self):
        global mongo_instance
        if not mongo_instance:
            return self.mongodb_conn_instantiate()[0]
        else:
            return mongo_instance
    
    def get_mongodb_connection_review(self):
        global mongo_review_instance
        if not mongo_review_instance:
            return self.mongodb_conn_instantiate()[1]
        else:
            return mongo_review_instance

    def get_es_client(self):
        global es_instance
        if not es_instance:
            return self.instantiate_es_client()
        else:
            return es_instance

    # Method to ingest doc into mongo db
    def insert_bulk(self, data):
        col = self.get_mongodb_connection()
        try:
            col.insert_many(data, ordered=False)
            return len(data)
        except Exception as e:
            return "Found duplicates, but everything is ok"

    # Searches the object into mongo collection
    def search_db(self, query, exclude, offset, res_limit):
        col = self.get_mongodb_connection()
        if offset is None and res_limit is None:
            res = col.find(query, exclude).sort([("_id", 1)])
        else:
            res = (
                col.find(query, exclude)
                .sort([("_id", -1)])
                .skip(offset)
                .limit(res_limit)
            )
        result = []
        for record in res:
            result.append(record)
        return result

    def delete_bulk(self, query):
        col = self.get_mongodb_connection()
        deleted = col.delete_many(query)
        return deleted.deleted_count

    def update_db(self, find_query, set_clause):
        col = self.get_mongodb_connection()
        updated = col.update(find_query, {"$set": set_clause})
        return updated

    # Method to index on to elasticsearch.
    def index_basic_to_es(self, index_obj):
        try:
            es = self.get_es_client()
            index_obj = self.add_timestamp_field(index_obj)
            index_obj1 = json.loads(json_util.dumps(index_obj))
            es.index(index=base_index, id=index_obj1["hash"], body=index_obj)
        except Exception as e:
            log.exception("Indexing FAILED", e)

    # Method to search from elasticsearch.
    def search_basic_from_es(self, query):
        log.info(f"the query is {query} ")
        result = []
        query_dict = {"bool": {"must": []}}
        for key in query.keys():
            query_dict["bool"]["must"].append({"match": {str(key): query[key]}})
        try:
            es = self.get_es_client()
            resp = es.search(index=base_index, size=1000, query=query_dict)
            hits = resp["hits"]["total"]["value"]
            log.info(f"Got {hits} Hits!")
            if hits > 0:
                for hit in resp["hits"]["hits"]:
                    result.append(hit["_source"])
        except Exception as e:
            log.exception("Searching FAILED", e)
        return result

    # Method to generate timestamp in the format es expects per index object.
    def add_timestamp_field(self, index_obj):
        epoch_short = eval(str(time.time()).replace(".", "")[0:10])
        index_obj["@timestamp"] = datetime.fromtimestamp(epoch_short).isoformat()
        return index_obj

    # Method to get domain/collectionSource based count from the db
    def count_from_db(self, column):
        col = self.get_mongodb_connection()
        value = "$" + column
        count = col.aggregate(
            [{"$group": {"_id": {column: value}, "count": {"$sum": 1}}}]
        )
        return count

    # Method to get count by language pair from the db
    def count_by_lang(self, srcLanguage, tgtLanguage):
        col = self.get_mongodb_connection()
        src_value = "$" + srcLanguage
        tgt_value = "$" + tgtLanguage
        count = col.aggregate(
            [
                {
                    "$group": {
                        "_id": {"srcLanguage": src_value, "tgtLanguage": tgt_value},
                        "count": {"$sum": 1},
                    }
                }
            ]
        )
        return count


    def update_vote(self ,hash, action):
        # Check if the item already exists in the collection
        col = self.get_mongodb_connection_review()
        item = col.find_one({"gloss_id": hash})
        if item:
            print(item)
            # Update the existing item with the new action
            if action == 1:
                col.update_one({"gloss_id": hash}, {"$inc": {"count": 1}})
            elif action == -1:
                col.update_one({"gloss_id": hash}, {"$inc": {"count": -1}})
        else:
            # Create a new item in the collection with the initial action
            print("true........")
            if action == 1:
                col.insert_one({"gloss_id": hash, "count": 1})
            elif action == -1:
                col.insert_one({"gloss_id": hash, "count": -1})

    #function to decrement the review count by 1 for the glossary which recieved suggestion 
    def update_count(self,hash):
        col = self.get_mongodb_connection()
        item = col.find_one({"hash": hash})
        if item :
            col.update_one({"hash":hash},{"$inc":{"count":-1}})
    
    #function to decrement the review count by 1 for the glossary which recieved suggestion
    def update_count_es(self, hash):
        try:
            es = self.get_es_client()
            q = {
                "query": {
                    "match": {
                        "hash.keyword":hash
                    }
                },
                "script": {
                    "source": "ctx._source.count=-1",
                    "lang": "painless"
                }
            }
            es.update_by_query(index="glossary-base-index",body=q)
        except Exception as e:
            log.exception("Count Updation FAILED", e)

    #function to delete the glossary from mongodb
    def delete_db(self, hash):
        col = self.get_mongodb_connection()
        item = col.find_one({"hash": hash})
        if item :
            col.delete_one({"hash":hash})

    #function to delete the glossary from elasticsearch
    def delete_es(self, hash):
        try:
            es = self.get_es_client()
            q = {
                "query": {
                    "term": {
                        "hash.keyword":hash
                    }
                }  
            }
            es.delete_by_query(index="glossary-base-index",body=q)
        except Exception as e:
            log.exception("Glossary Deletion FAILED", e)