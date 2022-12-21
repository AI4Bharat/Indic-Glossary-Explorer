/**
 * Login API
 */
import API from "../../../api";
import ENDPOINTS from "../../../../config/apiendpoint";
import constants from "../../../constants";

export default class LoginAPI extends API {
  constructor(username, password, timeout = 2000) {
    super("POST", timeout, false);
    this.username = username;
    this.password = password;
    this.type = constants.LOG_IN;
    this.endpoint = `${super.apiEndPoint()}${ENDPOINTS.login}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
        this.userData = res;
        console.log(res);
        localStorage.setItem("access_token", res.token);
        localStorage.setItem("userDetails", JSON.stringify(res.user));
        // localStorage.setItem()
    }
}

  apiEndPoint() {
    return this.endpoint;
  }

  getBody() {
    return {
      username: this.username,
      password: this.password,
    };
  }

  getHeaders() {
    this.headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.headers;
  }

  getPayload() {
    return this.userData
  }
}
