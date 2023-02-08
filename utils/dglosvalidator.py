import json
import logging


from repository.dglosrepo import DGlosRepo

# from service.dglosservice import DGlosService
from .dglosutils import DGlosUtils
from config.dglosconfigs import x_key, glossary_keys, levels, allowed_file_types

log = logging.getLogger("file")
dds_repo, utils = DGlosRepo(), DGlosUtils()


class DGlosValidator:
    def __init__(self):
        pass

    # Method to validate the glossary data before ingesting
    def validate_glossary(self, data):
        if "metadata" not in data.keys():
            return "Metadata unavailable"
        if "requestId" not in data["metadata"].keys():
            return "Request ID unavailable"
        if "glossary" not in data.keys():
            return "Glossary unavailable"
        if len(data["glossary"]) == 0:
            return "Glossary data is empty"
        for glos_key in glossary_keys:  # Check whether all keys required are present
            if not glos_key in data["glossary"][0]:
                return "{key} not found in glossary ".format(key=glos_key)
        valid_items = []

        for glos in data["glossary"]:  # for each dictionary of glossary data

            if type(glos["srcText"]) is not str or len(glos["srcText"].strip()) == 0:
                continue
            if type(glos["tgtText"]) is not str or len(glos["tgtText"].strip()) == 0:
                continue
            if (
                type(glos["srcLanguage"]) is not str
                or len(glos["srcLanguage"].strip()) == 0
            ):
                continue
            if (
                type(glos["tgtLanguage"]) is not str
                or len(glos["tgtLanguage"].strip()) == 0
            ):
                continue
            if len(glos["domain"].strip()) == 0:
                glos["domain"] = "unknown"
            if len(glos["collectionSource"].strip()) == 0:
                glos["collectionSource"] = "unknown"
            if glos["srcLanguage"] == glos["tgtLanguage"]:
                continue
            if glos["srcText"] == glos["tgtText"]:
                continue
            if not glos["level"] in levels:
                continue
            valid_items.append(glos)

        return valid_items

    # Method to validate the file type to allow only supported ones
    def validate_filetype(self, filename):
        extension = filename.split(".")[-1]
        if extension not in allowed_file_types:
            return "Filetype {} is not allowed".format(extension)
        return None

    # Method to check if all the required keys are part of request body
    def validate_search(self, data):
        if "inputs" not in data.keys():
            return "No input provided"
        if "tgtLanguage" not in data.keys():
            return "Target language is manadatory"

    def validate_x_key(self, ip_req):
        log.info("Validating the X Key.........")
        if "xKey" not in ip_req["metadata"].keys():
            return {"status": "Invalid Access", "message": "Signup Request Failed!"}
        if ip_req["metadata"]["xKey"] != x_key:
            return {"status": "Invalid Access", "message": "Signup Request Failed!"}

    # Method to check if all the mandatory fields are present for sign up
    def validate_signup(self, user_signup_req):
        try:
            log.info("Validating the Signup request.........")
            x_key_valid = self.validate_x_key(user_signup_req)
            if x_key_valid:
                return x_key_valid
            if "email" not in user_signup_req.keys():
                return {"status": "VALIDATION_FAILED", "message": "email is mandatory!"}
            if "password" not in user_signup_req.keys():
                return {
                    "status": "VALIDATION_FAILED",
                    "message": "password is mandatory!",
                }
        except Exception as e:
            log.exception(f"Exception in upload validation: {e}", e)
            return {
                "status": "VALIDATION_FAILED",
                "message": "mandatory fields missing.",
            }

    # Method to check if the user credentials are valid for login
    def validate_login_req(self, api_request):
        try:
            log.info("Validating the Login request.........")
            data = api_request.get_json()
            if "username" not in data.keys():
                return {
                    "status": "VALIDATION_FAILED",
                    "message": "username is mandatory!",
                }
            if "password" not in data.keys():
                return {
                    "status": "VALIDATION_FAILED",
                    "message": "password is mandatory!",
                }
        except Exception as e:
            log.exception(f"Exception in login validation: {e}", e)
            return {
                "status": "VALIDATION_FAILED",
                "message": "mandatory fields missing.",
            }

    def validate_delete_req(self, data):
        try:
            log.info("Validating the Delete Uploads request.........")
            if "uploadIds" not in data.keys():
                return {
                    "status": "VALIDATION_FAILED",
                    "message": "uploadIds is mandatory!",
                }
        except Exception as e:
            log.exception(f"Exception in login validation: {e}", e)
            return {
                "status": "VALIDATION_FAILED",
                "message": "mandatory fields missing.",
            }
