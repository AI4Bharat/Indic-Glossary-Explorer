from re import sub

import bcrypt as bcrypt
import logging
from repository.dglosrepo import DGlosRepo

log = logging.getLogger("file")
dds_repo = DGlosRepo()
list_of_tc_keys, t_and_c_data = [], {}


class DGlosUtils:
    def __init__(self):
        pass

    def hash_password(self, password):
        password_in_byte = bytes(password, "utf-8")
        salt = bcrypt.gensalt()
        hashed_pwd = bcrypt.hashpw(password_in_byte, salt)
        return hashed_pwd, salt

    def verify_pwd(self, pwd, salt, ip_pwd):
        password_in_byte = bytes(ip_pwd, "utf-8")
        hashed_pwd = bcrypt.hashpw(password_in_byte, salt)
        if pwd == hashed_pwd:
            return True
        return False

    def camel_case(self, str):
        s = sub(r"(_|-)+", " ", str).title().replace(" ", "")
        return "".join([s[0].lower(), s[1:]])
