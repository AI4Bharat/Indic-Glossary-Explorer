import logging
import pymongo
from config.dglosconfigs import db_cluster, db, user_collection, session_collection

log = logging.getLogger("file")

mongo_instance_user = None
mongo_instance_session = None


class UserRepo:
    def __init__(self):
        pass

    # Initialises and fetches mongo db client
    def instantiate(self):
        global mongo_instance_user
        client = pymongo.MongoClient(db_cluster)
        mongo_instance_user = client[db][user_collection]
        mongo_instance_session = client[db][session_collection]
        return [mongo_instance_user, mongo_instance_session]

    def get_user_connection(self):
        global mongo_instance_user
        if not mongo_instance_user:
            return self.instantiate()[0]
        else:
            return mongo_instance_user

    def get_session_connection(self):
        global mongo_instance_session
        if not mongo_instance_session:
            return self.instantiate()[1]
        else:
            return mongo_instance_session

    def insert_users(self, data):
        col = self.get_user_connection()
        col.insert_many(data)
        return len(data)

    def update_users(self, find_query, set_clause):
        col = self.get_user_connection()
        updated = col.update(find_query, {"$set": set_clause})
        return updated

    # Searches the object into mongo collection
    def search_users(self, query, exclude, offset, res_limit):
        col = self.get_user_connection()
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

    def delete_users(self, query):
        col = self.get_user_connection()
        deleted = col.delete_many(query)
        return deleted.deleted_count

    def login(self, user_data):
        col = self.get_session_connection()
        col.insert(user_data)

    def session_search(self, query):
        col = self.get_session_connection()
        res = col.find(query, {"_id": False}).sort([("_id", 1)])
        result = []
        for record in res:
            result.append(record)
        return result

    def logout(self, query):
        col = self.get_session_connection()
        deleted = col.delete_many(query)
        return deleted.deleted_count

    def delete_a_key(self, query, key):
        col = self.get_user_connection()
        updated = col.update(query, {"$unset": {key: 1}}, False, True)
        return updated
