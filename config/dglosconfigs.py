import os
from dotenv import load_dotenv
load_dotenv()

db_cluster = os.environ.get(
    "MONGO_CLUSTER_URL",
)
app_host = os.environ.get("DGLOS_APP_HOST", "localhost")
app_port = os.environ.get("DGLOS_APP_PORT", 5001)
context_path = os.environ.get("DMU_GLOS_CONTEXT_PATH", "/glossary-explorer")
db = os.environ.get("DMU_GLOS_DB", "dmu-glossary")
user_collection = os.environ.get("DMU_GLOS_USER_COL", "users")
dglos_collection = os.environ.get("DMU_GLOS_GLOSSARY_COL", "glossary")
es_url = os.environ.get("DMU_GLOS_ES_URL", "http://127.0.0.1:9200")
base_index = os.environ.get("DMU_GLOS_BASE_INDEX", "glossary-base-index")
session_collection = os.environ.get("DMU_GLOS_GLOSSARY_SES_COL", "sessions")
review_collection = os.environ.get("DMU_GLOS_GLOSSARY_REV_COL", "reviews")
session_timeout_in_ms = os.environ.get("DMU_DUS_SESSION_TIMEOUT_IN_MS", 86400000)
allowed_file_types = ["xls", "xlsx", "csv", "tsv"]
local_storage_path = os.environ.get(
    "DMU_GLOS_LOCAL_STORAGE_PATH", "‪C:/Users/Test/Documents/gloss"
)
x_key = os.environ.get(
    "DMU_GLOS_X_KEY",
)
max_file_size_in_mb = os.environ.get("DMU_GLOS_MAX_FILE_SIZE_IN_MB", 5000)
glossary_keys = [
    "srcLanguage",
    "tgtLanguage",
    "srcText",
    "tgtText",
    "domain",
    "collectionSource",
    "level",
]
levels = ["w", "s", "p"]
if isinstance(max_file_size_in_mb, str):
    max_file_size_in_mb = eval(max_file_size_in_mb)
phrase_length_in_words = os.environ.get("DMU_GLOS_PHRASE_LENGTH_IN_WORDS", 100)
discarded_response_data = ["@timestamp", "audit"]
supported_languages = "models/languages.json"
supported_domains = "models/domains.json"
cron_interval = 300
MAIL_SETTINGS = {
    "MAIL_SERVER": os.environ.get("SMTP_HOST", "smtp.gmail.com"),
    "MAIL_PORT": os.environ.get("SMTP_PORT", 465),
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_PASSWORD": os.environ.get(
        "SMTP_PASSWORD",
    ),
    "MAIL_SENDER_NAME": os.environ.get("SMTP_SENDERNAME", "Glossary-explorer support"),
    "MAIL_SENDER": os.environ.get(
        "SUPPORT_EMAIL",
    ),
    "MAIL_RECIEVER": os.environ.get(
        "RECIEVER_EMAIL",
    ),
}
