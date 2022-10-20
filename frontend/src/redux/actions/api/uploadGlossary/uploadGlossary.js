/**
 * uploadGlossary
 */
import API from "../../../api";
import ENDPOINTS from "../../../../config/apiendpoint";
import constants from "../../../constants";

export default class uploadGlossary extends API {
    constructor(glossaryFile, timeout = 2000) {
        super("POST", timeout, false);
        this.glossaryFile = glossaryFile
        this.type = constants.UPLOAD_GLOSSARY_FILE;
        this.endpoint = `${super.apiEndPoint()}${ENDPOINTS.uploadGlossary}`;
    }

    processResponse(res) {
        super.processResponse(res);
        if (res) {
            this.userData = res;
            console.log(res);
        }
    }

    apiEndPoint() {
        return this.endpoint;
    }

    getBody() {
        const formData = new FormData();
        formData.append("glossaryFile", this.glossaryFile[0])
        return formData;
    }

    getHeaders() {
        this.headers = {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        };
        return this.headers;
    }

    getPayload() {
        return this.userData
    }
}
