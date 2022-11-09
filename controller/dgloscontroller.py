
import logging
import time
import uuid
import json
from flask import Flask, json, jsonify, request
from logging.config import dictConfig
from config.dglosconfigs import context_path, x_key,supported_languages,supported_domains
from service.dglosservice import DGlosService
from service.userservice import UserService
from utils.dglosvalidator import DGlosValidator
from flask_cors import CORS
dglos_app = Flask(__name__)
cors = CORS(dglos_app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
log = logging.getLogger('file')
@dglos_app.route(context_path + '/ping')
def index():
    return jsonify(
        status=True,
        message='Welcome to the DMU Glossary Server!'
    )

@dglos_app.route(context_path + '/v1/lang', methods=['GET'])
def dropdown_lang():
    with open(supported_languages, 'r') as f:
        data = json.load(f)
    return jsonify(data), 200

@dglos_app.route(context_path + '/v1/domain', methods=['GET'])
def dropdown_domain():
    with open(supported_domains, 'r') as f:
        data = json.load(f)
    return jsonify(data), 200

@dglos_app.route(context_path + '/v1/signup', methods=["POST"])
def signup():
    dds_service, user_service, validator = DGlosService(), UserService(), DGlosValidator()
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
@dglos_app.route(context_path + '/v1/login', methods=["POST"])
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
        if 'status' in response.keys():
            return jsonify(response), 400
        return jsonify(response), 200
    except Exception as e:
        log.exception("Something went wrong: " + str(e), e)
        return {"status": "FAILED", "message": "Something went wrong"}, 400

@dglos_app.route(context_path + '/v1/glossary/create', methods=["POST"])
def create():
    dglos_service, validator = DGlosService(), DGlosValidator()
    data = request.get_json()
    data = add_headers(data, request, "userId")
    validation_response = validator.validate_glossary(data)
    try:
        if validation_response != None:
            raise Exception(validation_response)
        response = dglos_service.create(data)
        return jsonify(response), 200
    except Exception as e:
        log.exception("Something went wrong: " + str(e), e)
        return {"status": "FAILED", "message": "ERROR: "+str(e)}, 400
# REST endpoint for login
@dglos_app.route(context_path + '/v1/glossary/file/upload', methods=["POST"])
def upload():
    dglos_service, validator = DGlosService(), DGlosValidator()
    data = request.get_json()
    data = add_headers(data, request, "userId")
    validator_response = validator.validate_filetype(request.files['glossaryFile'].filename)
    try:
        if validator_response != None:
           raise Exception(validator_response)
        response = dglos_service.upload_file(request, data)
        return jsonify(response), 200
    except Exception as e:
        log.exception("Something went wrong: " + str(e), e)
        return {"status": "FAILED", "message": "Something went wrong."+ str(e)}, 400
# REST endpoint for logout
@dglos_app.route(context_path + '/v1/sentence/phrases/search', methods=["POST","GET"])
def search_phrases_for_sentence():
    dglos_service, validator = DGlosService(), DGlosValidator()
    data = request.get_json()
    log.info(f"data is {data}")
    data = add_headers(data, request, "userId")
    validation_response = validator.validate_search(data)
    try:
        if validation_response != None:
            raise Exception(validation_response)
        response = dglos_service.search_glossary(data)
        return jsonify(response), 200
    except Exception as e:
        log.exception("Something went wrong: " + str(e), e)
        return {"status": "FAILED", "message": "Something went wrong"+ str(e)}, 400
# Fetches required headers from the request and adds it to the body.
def add_headers(data, api_request, user_id):
    if not data:
        data = {}
    headers = {
        "userId": user_id,
        "receivedAt": eval(str(time.time()).replace('.', '')[0:13]),
        "requestId": str(uuid.uuid4())
    }
    api_headers = dict(api_request.headers)
    if 'X-Key' in api_headers.keys():
        headers["xKey"] = api_headers['X-Key']
    if 'X-Token' in api_headers.keys():
        headers["token"] = api_headers['X-Token']
    data["metadata"] = headers
    return data
# Log config
dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] {%(filename)s:%(lineno)d} %(threadName)s %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {
        'info': {
            'class': 'logging.FileHandler',
            'level': 'DEBUG',
            'formatter': 'default',
            'filename': 'info.log'
        },
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'DEBUG',
            'formatter': 'default',
            'stream': 'ext://sys.stdout',
        }
    },
    'loggers': {
        'file': {
            'level': 'DEBUG',
            'handlers': ['info', 'console'],
            'propagate': ''
        }
    },
    'root': {
        'level': 'DEBUG',
        'handlers': ['info', 'console']
    }
}) 