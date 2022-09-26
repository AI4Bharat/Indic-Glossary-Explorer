import os

db_cluster = os.environ.get('MONGO_CLUSTER_URL', 'mongodb://localhost:27017')
app_host = os.environ.get('DGLOS_APP_HOST', 'localhost')
app_port = os.environ.get('DGLOS_APP_PORT', 5001)
context_path = os.environ.get('DMU_GLOS_CONTEXT_PATH', '/dmu-glossary/glossary-service')
db = os.environ.get('DMU_GLOS_DB', "dmu-glossary")
dglos_collection = os.environ.get('DMU_GLOS_GLOSSARY_COL', "glossary_phrases")
es_url = os.environ.get('DMU_GLOS_ES_URL', 'localhost')
base_index = os.environ.get('DMU_GLOS_BASE_INDEX', 'glossary-base-index')
session_collection = os.environ.get('DMU_GLOS_GLOSSARY_COL', "sessions")
allowed_file_types = ["xls,xlsx"]
local_storage_path = os.environ.get('DMU_GLOS_LOCAL_STORAGE_PATH', "‪C:/Users/Test/Documents/gloss")
x_key = os.environ.get('DMU_GLOS_X_KEY', "d6fd7481-f43e-4b76-b882-2ec512350d75")
max_file_size_in_mb = os.environ.get('DMU_GLOS_MAX_FILE_SIZE_IN_MB', 5000)
if isinstance(max_file_size_in_mb, str):
    max_file_size_in_mb = eval(max_file_size_in_mb)
phrase_length_in_words = os.environ.get('DMU_GLOS_PHRASE_LENGTH_IN_WORDS', 10)

