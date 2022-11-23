
import logging
from unittest import result
from repository.dglosrepo import DGlosRepo
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
from bson.json_util import dumps, loads


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
    search_query_dict = data.copy()
    del search_query_dict['inputs']       
    data = add_headers(data, request, "userId")
    validation_response = validator.validate_search(data)
    try:
        if validation_response != None:
            raise Exception(validation_response)
        response = dglos_service.search_glossary(data,search_query_dict)
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


@dglos_app.route(context_path + '/v1/count', methods=["GET"])
def data_count(): 
    count=DGlosRepo()
    domain=count.count_from_db('domain')
    collection_source = count.count_from_db('collectionSource')
    domain_list=list(domain)
    collection_source_list=list(collection_source)
    domains = []
    collection_sources=[]
    total_count_domain = 0
    total_count_collectionSource=0
    for item in domain_list:
        diction = item['_id']
        diction['count'] = item['count']
        domains.append(diction)
        total_count_domain += item['count']
    domain_count = {'domains':domains,"totalCount":total_count_domain}
    for item in collection_source_list:
        diction = item['_id']
        diction['count'] = item['count']
        collection_sources.append(diction)
        total_count_collectionSource += item['count']
    collectionSource_count={'CollectionSources':collection_sources,"totalCount":total_count_collectionSource}
    result = [domain_count,collectionSource_count]

    return  jsonify(result),200

@dglos_app.route(context_path + '/v1/lang_count', methods=["GET"])
def lang_count(): 
    data =request.get_json()
    langcode=data['srcLanguage']
    count=DGlosRepo()
    lang=count.count_by_lang('srcLanguage','tgtLanguage',langcode)
    lang_list=list(lang)
    lang_pair=[]
    lang_count=0
    with open(supported_languages, 'r') as f:
        data = json.load(f)
    for item in lang_list:
        language_code = item['_id']['tgtLanguage']
        lang_full_name = ' '
        for i in data['languages']:
            if i['code'] == language_code:
                lang_full_name=i['label']
                break
        diction = item['_id']
        diction['count'] = item['count']
        diction['label'] = lang_full_name
        lang_pair.append(diction)
        lang_count += item['count']
    count_by_lang={'languages':lang_pair,"totalCount":lang_count}
    result = [count_by_lang]
    return jsonify(result),200
