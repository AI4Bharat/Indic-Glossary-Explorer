/**
 * addGlossary
 */
import API from "../../../api";
import ENDPOINTS from "../../../../config/apiendpoint";
import constants from "../../../constants";

export default class addGlossary extends API {
    constructor(srcLang = "", trgLang = "", srcText = "", trgText = "", domain = "", collectionSource = "", level = "", timeout = 2000) {
        super("POST", timeout, false);
        this.type = constants.ADD_INDIVIDUAL_GLOSSARY;
        this.srcLang = srcLang;
        this.trgLang = trgLang;
        this.srcText = srcText;
        this.trgText = trgText;
        this.domain = domain;
        this.collectionSource = collectionSource;
        this.level = level;
        this.endpoint = `${super.apiEndPoint()}${ENDPOINTS.createGlossary}`;
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
        return {
            "glossary":
                [
                    {
                        srcLanguage: this.srcLang,
                        tgtLanguage: this.trgLang,
                        srcText: this.srcText,
                        tgtText: this.trgText,
                        domain: this.domain,
                        collectionSource: this.collectionSource,
                        level: this.level
                    }
                ]
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
