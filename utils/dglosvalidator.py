import json
import logging
from repository.dglosrepo import DGlosRepo
from service.dglosservice import DGlosService
from .dglosutils import DGlosUtils
from config.dglosconfigs import x_key,glossary_keys,levels,allowed_file_types
log = logging.getLogger('file')
dds_repo, dds_service, utils = DGlosRepo(), DGlosService(), DGlosUtils()
class DGlosValidator:
    def __init__(self):
        pass
    def validate_glossary(self,data):
        if 'metadata' not in data.keys():
            return "Metadata unavailable"
        if 'requestId' not in data['metadata'].keys():
            return "Request ID unavailable"
        if 'glossary' not in data.keys():
            return "Glossary unavailable"
        if len(data['glossary']) == 0:
            return "Glossary data is empty"
        for glos in data['glossary']: #for each dictionary of glossary data
            for glos_key in glossary_keys: #Check whether all keys required are present
                if not glos_key in glos:
                    return "{key} not found in glossary".format(key=glos_key)
            if(glos['srcLanguage'] == glos['tgtLanguage']):
                return "Source and target languages cannot be the same"
            if not glos['level'] in levels:
                return "Level unavailable"
        return None
    # def validate_filetype(self,filename):
    #     # if 'files' not in data.keys():
    #     #     return "No file data provided"
    #     # if "glossaryFile" not in data['files'].keys():
    #     #     return "No glossary file provided"
    #     # filename = data['files']['glossaryFile']
    #     extension = filename.split('.')[-1]
    #     if extension not in allowed_file_types:
    #         return "Filetype {} is not allowed".format(extension)
    #     return None

    def validate_x_key(self, ip_req):
        log.info("Validating the X Key.........")
        if "xKey" not in ip_req["metadata"].keys():
            return {"status": "Invalid Access", "message": "Signup Request Failed!"}
        if ip_req["metadata"]["xKey"] != x_key:
            return {"status": "Invalid Access", "message": "Signup Request Failed!"}
    def validate_signup(self, user_signup_req):
        try:
            log.info("Validating the Signup request.........")
            x_key_valid = self.validate_x_key(user_signup_req)
            if x_key_valid:
                return x_key_valid
            if 'email' not in user_signup_req.keys():
                return {"status": "VALIDATION_FAILED", "message": "email is mandatory!"}
            if 'password' not in user_signup_req.keys():
                return {"status": "VALIDATION_FAILED", "message": "password is mandatory!"}
        except Exception as e:
            log.exception(f"Exception in upload validation: {e}", e)
            return {"status": "VALIDATION_FAILED", "message": "mandatory fields missing."}
    def validate_upload_req(self, api_request, data):
        try:
            if dds_service.is_system_busy():
                return {"status": "FAILED", "message": "The System is currently busy, please try after sometime."}
            log.info("Validating the Upload request.........")
            files = api_request.files
            agreement = json.loads(api_request.form.get('agreement'))
            if 'zipFile' not in files.keys():
                return {"status": "VALIDATION_FAILED", "message": "zipFile is mandatory!"}
            if 'metadata' not in files.keys():
                return {"status": "VALIDATION_FAILED", "message": "metadata is mandatory!"}
            response = self.validate_terms_and_cond(agreement)
            if response:
                return response
            return None
        except Exception as e:
            log.exception(f"Exception in upload validation: {e}", e)
            return {"status": "VALIDATION_FAILED", "message": "metadata, zipFile, agreement are mandatory"}
    def validate_login_req(self, api_request):
        try:
            log.info("Validating the Login request.........")
            data = api_request.get_json()
            if 'username' not in data.keys():
                return {"status": "VALIDATION_FAILED", "message": "username is mandatory!"}
            if 'password' not in data.keys():
                return {"status": "VALIDATION_FAILED", "message": "password is mandatory!"}
        except Exception as e:
            log.exception(f"Exception in login validation: {e}", e)
            return {"status": "VALIDATION_FAILED", "message": "mandatory fields missing."}
    def validate_delete_req(self, data):
        try:
            log.info("Validating the Delete Uploads request.........")
            if 'uploadIds' not in data.keys():
                return {"status": "VALIDATION_FAILED", "message": "uploadIds is mandatory!"}
        except Exception as e:
            log.exception(f"Exception in login validation: {e}", e)
            return {"status": "VALIDATION_FAILED", "message": "mandatory fields missing."}
    def validate_terms_and_cond(self, data):
        list_of_tc_keys = utils.get_t_and_c()[1]
        try:
            log.info("Validating the T&C request.........")
            if 'termsAndConditions' not in data.keys():
                return {"status": "VALIDATION_FAILED", "message": "termsAndConditions is mandatory!"}
            if data["termsAndConditions"] not in list_of_tc_keys:
                return {"status": "VALIDATION_FAILED", "message": "termsAndConditions is invalid!"}
            if 'permission' not in data.keys():
                return {"status": "VALIDATION_FAILED", "message": "permission is mandatory!"}
            if data["permission"] not in list_of_tc_keys:
                return {"status": "VALIDATION_FAILED", "message": "permission is invalid!"},
            if 'acceptance' not in data.keys():
                return {"status": "VALIDATION_FAILED", "message": "acceptance is mandatory!"}
            if data["acceptance"] not in list_of_tc_keys:
                return {"status": "VALIDATION_FAILED", "message": "acceptance is invalid!"}
        except Exception as e:
            log.exception(f"Exception in login validation: {e}", e)
            return {"status": "VALIDATION_FAILED", "message": "mandatory fields missing."}
    def validate_tc_del_req(self, tc_del_req):
        try:
            log.info("Validating the TC Delete request.........")
            x_key_valid = self.validate_x_key(tc_del_req)
            if x_key_valid:
                return x_key_valid
        except Exception as e:
            log.exception(f"Exception in upload validation: {e}", e)
            return {"status": "VALIDATION_FAILED", "message": "mandatory fields missing."}
    def validate_users_del(self, users_del_req):
        try:
            log.info("Validating the Users Delete request.........")
            x_key_valid = self.validate_x_key(users_del_req)
            if x_key_valid:
                return x_key_valid
            if 'username' not in users_del_req.keys():
                return {"status": "VALIDATION_FAILED", "message": "username is mandatory!"}
        except Exception as e:
            log.exception(f"Exception in upload validation: {e}", e)
            return {"status": "VALIDATION_FAILED", "message": "mandatory fields missing."}