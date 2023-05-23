import logging
from unittest import result
from repository.dglosrepo import DGlosRepo
import time
import uuid
import json
from flask import Flask, json, jsonify, request
from logging.config import dictConfig
from config.dglosconfigs import (
    context_path,
    x_key,
    supported_languages,
    supported_domains,
)
from service.dglosservice import DGlosService
from service.userservice import UserService
from utils.dglosvalidator import DGlosValidator
from flask_cors import CORS
from bson.json_util import dumps, loads


dglos_app = Flask(__name__)
cors = CORS(dglos_app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
log = logging.getLogger("file")


@dglos_app.route(context_path + "/ping")
def index():
    return jsonify(status=True, message="Welcome to the DMU Glossary Server!")


@dglos_app.route(context_path + "/v1/lang", methods=["GET"])
def dropdown_lang():
    with open(supported_languages, "r") as f:
        data = json.load(f)
    return jsonify(data), 200


@dglos_app.route(context_path + "/v1/domain", methods=["GET"])
def dropdown_domain():
    with open(supported_domains, "r") as f:
        data = json.load(f)
    return jsonify(data), 200


# REST endpoint for signup
@dglos_app.route(context_path + "/v1/signup", methods=["POST"])
def signup():
    dds_service, user_service, validator = (
        DGlosService(),
        UserService(),
        DGlosValidator(),
    )
    data = request.get_json()
    data = add_headers(data, request, "userId")
    try:
        validated = validator.validate_signup(data)
        if validated:
            return jsonify(validated), 400
        response = user_service.signup(data)
        return jsonify(response), 200
    except Exception as e:
        log.exception("Something went wrong: " + str(e), e)
        return {"status": "FAILED", "message": "Something went wrong"}, 400


# REST endpoint for login
@dglos_app.route(context_path + "/v1/login", methods=["POST"])
def login():
    user_service, validator = UserService(), DGlosValidator()
    data = request.get_json()
    try:
        validation_res = validator.validate_login_req(request)
        if validation_res:
            return jsonify(validation_res), 400
        response = user_service.login(data)
        log.info(response)
        if not response:
            return {"status": "FAILED", "message": "Something went wrong"}, 400
        if "status" in response.keys():
            return jsonify(response), 400
        return jsonify(response), 200
    except Exception as e:
        log.exception("Something went wrong: " + str(e), e)
        return {"status": "FAILED", "message": "Something went wrong"}, 400


# REST endpoint for creating individual glossary
@dglos_app.route(context_path + "/v1/glossary/create", methods=["POST"])
def create():
    dglos_service, validator = DGlosService(), DGlosValidator()
    data = request.get_json()
    data = add_headers(data, request, "userId")
    validation_response = validator.validate_glossary(data)
    if type(validation_response) != list:
        return (
            jsonify(
                {
                    "message": "Glossary Upload FAILED!",
                    "status": "FAILED",
                    "error": validation_response,
                }
            ),
            400,
        )

        # if validation_response != None:
        #     raise Exception(validation_response)
    clean_data = {"metadata": data["metadata"], "glossary": validation_response}
    response = dglos_service.create(clean_data)
    return jsonify(response), 200


# REST endpoint for glossary file upload
@dglos_app.route(context_path + "/v1/glossary/file/upload", methods=["POST"])
def upload():
    dglos_service, validator = DGlosService(), DGlosValidator()
    data = request.get_json()
    data = add_headers(data, request, "userId")
    validator_response = validator.validate_filetype(
        request.files["glossaryFile"].filename
    )
    try:
        if validator_response != None:
            raise Exception(validator_response)
        response = dglos_service.upload_file(request, data)
        if response["status"] == "FAILED":
            return jsonify(response), 400
        return jsonify(response)
    except Exception as e:
        log.exception("Something went wrong: " + str(e), e)
        return {"status": "FAILED", "message": "Something went wrong." + str(e)}


# REST endpoint for searching glossaries
@dglos_app.route(context_path + "/v1/sentence/phrases/search", methods=["POST", "GET"])
def search_phrases_for_sentence():
    dglos_service, validator = DGlosService(), DGlosValidator()
    data = request.get_json()
    log.info(f"data is {data}")
    search_query_dict = data.copy()
    del search_query_dict["inputs"]
    data = add_headers(data, request, "userId")
    validation_response = validator.validate_search(data)
    try:
        if validation_response != None:
            raise Exception(validation_response)
        response = dglos_service.search_glossary(data, search_query_dict)
        return jsonify(response), 200
    except Exception as e:
        log.exception("Something went wrong: " + str(e), e)
        return {"status": "FAILED", "message": "Something went wrong" + str(e)}, 400


# Fetches required headers from the request and adds it to the body.
def add_headers(data, api_request, user_id):
    if not data:
        data = {}
    headers = {
        "userId": user_id,
        "receivedAt": eval(str(time.time()).replace(".", "")[0:13]),
        "requestId": str(uuid.uuid4()),
    }
    api_headers = dict(api_request.headers)
    if "X-Key" in api_headers.keys():
        headers["xKey"] = api_headers["X-Key"]
    if "X-Token" in api_headers.keys():
        headers["token"] = api_headers["X-Token"]
    data["metadata"] = headers
    return data


# Log config
dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] {%(filename)s:%(lineno)d} %(threadName)s %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "info": {
                "class": "logging.handlers.RotatingFileHandler",
                "formatter": "default",
                "filename": "info.log",
                "maxBytes":1024 * 1024 *10 ,
                "backupCount" : 2
            },
            "console": {
                "class": "logging.StreamHandler",
                "level": "DEBUG",
                "formatter": "default",
                "stream": "ext://sys.stdout",
            },
        },
        "loggers": {
            "file": {"level": "DEBUG", "handlers": ["info", "console"], "propagate": ""}
        },
        "root": {"level": "DEBUG", "handlers": ["info", "console"]},
    }
)

# REST endpoint to fetch domain/collectionSource based count
@dglos_app.route(context_path + "/v1/count", methods=["GET"])
def sourcecount():
    with open("models/count_by_domainandsource.json", "r") as f:
        data = json.load(f)
    return jsonify(data), 200


# REST endpoint to fetch language pair based count
@dglos_app.route(context_path + "/v1/lang_count", methods=["GET"])
def langpaircount():
    with open("models/count_by_languagepair.json", "r") as f:
        data = json.load(f)
    return jsonify(data), 200

# REST endpoint to update the review count 
@dglos_app.route(context_path + "/v1/review", methods=["POST"])
def update():
    review = DGlosRepo()
    # Get the item_id and action from the request body
    data = request.get_json()
    hash = data["item_id"]
    action = data["action"]
    # Update the upvote and downvote for the item
    review.update_vote(hash, action)
    return jsonify({"message": "Review updated"})

#REST endpoint to suggest a new glossary for an existing one  and decrement count for the earlier one
@dglos_app.route(context_path + "/v1/suggest", methods=["POST"])
def suggest():
    dglos_service, validator ,suggest = DGlosService(), DGlosValidator(),DGlosRepo()
    data = request.get_json()
    new_data = data["new"]
    hash = data["hash"]
    data = add_headers(new_data, request, "userId")
    validation_response = validator.validate_glossary(data)
    if type(validation_response) != list:
        return (
            jsonify(
                {
                    "message": "Glossary Upload FAILED!",
                    "status": "FAILED",
                    "error": validation_response,
                }
            ),
            400,
        )
    clean_data = {"metadata": data["metadata"], "glossary": validation_response}
    dglos_service.create(clean_data)
    suggest.update_count(hash)
    suggest.update_count_es(hash)
    return jsonify({"message": "Suggestion recieved"})

# REST endpoint to delete the glossary 
@dglos_app.route(context_path + "/v1/delete", methods=["POST"])
def delete_glossary():
    dglosrepo = DGlosRepo()
    data = request.get_json()
    hash = data["hash"]
    if type(hash) != None:
        dglosrepo.delete_db(hash)
        dglosrepo.delete_es(hash)
    return jsonify({"message": "Glossary deleted"})


    
    



