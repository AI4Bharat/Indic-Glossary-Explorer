import API from "../../../api";
import ENDPOINTS from "../../../../config/apiendpoint";
import C from "../../../constants";
 
 export default class FetchLanguageCountData extends API {
   constructor(srcLanguage = "en", timeout = 2000) {
     super("GET", timeout, false);
    //  this.progressObj1 = progressObj1;
     this.type = C.FETCH_LANGUAGE_COUNT_DATA;
     this.srcLanguage = srcLanguage;
     this.endpoint = `${super.apiEndPoint()}${ENDPOINTS.getIndicGlossaryExplorerLanguageCount}`;
   }
 
   processResponse(res) {
     super.processResponse(res);
     if (res) {
       this.fetchLangCountData = res;
     }
   }
 
   apiEndPoint() {
     return this.endpoint;
   }
 
   getBody() {
     return {
      srcLanguage : this.srcLanguage
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
     return this.fetchLangCountData;
   }
 }