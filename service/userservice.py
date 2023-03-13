import logging
import time
import uuid

from utils.dglosutils import DGlosUtils
from repository.userrepo import UserRepo
from config.dglosconfigs import session_timeout_in_ms

dds_utils = DGlosUtils()
user_repo = UserRepo()
log = logging.getLogger("file")


class UserService:
    def __init__(self):
        pass

    def signup(self, user_signup_req):
        log.info("Signing Up...")
        query = {"username": user_signup_req["email"]}
        users = user_repo.search_users(query, {"_id": False}, None, None)
        if users:
            return {
                "status": "Signup failed",
                "message": "Username already used, try a different email Id.",
            }
        pwd = dds_utils.hash_password(user_signup_req["password"])
        user_signup_req["password"], user_signup_req["salt"] = pwd[0], pwd[1]
        user_signup_req["username"] = user_signup_req["email"]
        user_signup_req["userId"] = str(uuid.uuid4())
        del user_signup_req["metadata"]
        user_repo.insert_users([user_signup_req])
        return {"status": "Success", "message": "User created Successfully"}

    def delete_user(self):
        pass

    # Method used to check login credentials for login
    def login(self, login_req):
        log.info("Logging in...")
        query = {"username": login_req["username"]}
        try:
            users = user_repo.search_users(query, {"_id": False}, None, None)
            if not users:
                return {"status": "login failed", "message": "Invalid User"}
            user = users[0]
            if dds_utils.verify_pwd(
                user["password"], user["salt"], login_req["password"]
            ):
                user_repo.logout({"userId": user["userId"]})
                login_entity = {
                    "userId": user["userId"],
                    "token": str(uuid.uuid4()),
                    "createdAt": eval(str(time.time()).replace(".", "")[0:13]),
                    "expired": False,
                }
                user_repo.login(login_entity)
                del user["password"]
                del user["salt"]
                user_data = {"token": login_entity["token"], "user": user}
                return user_data
            else:
                return {"status": "login failed", "message": "Invalid Password"}
        except Exception as e:
            log.exception(f"Exception while logging in: {e}", e)
            return None

    def is_session_active(self, token):
        log.info("Checking if the user session is active.....")
        session_details = user_repo.session_search({"token": token})
        if not session_details:
            log.info(f"Invalid Token!")
            return False
        session_details = session_details[0]
        diff = (
            eval(str(time.time()).replace(".", "")[0:13]) - session_details["createdAt"]
        )
        if diff > session_timeout_in_ms:
            log.info(f"Session Expired")
            self.logout(token)
            return False
        return session_details["userId"]

    def logout(self):
        pass
