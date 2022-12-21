import API from "../../../api";
import ENDPOINTS from "../../../../config/apiendpoint";
import C from "../../../constants";
 
 export default class FetchDomainAndCollectionSourceData extends API {
   constructor(timeout = 2000) {
     super("GET", timeout, false);
    //  this.progressObj1 = progressObj1;
     this.type = C.FETCH_DOMAIN_AND_COLLECTION_SOURCE_DATA;
     this.endpoint = `${super.apiEndPoint()}${ENDPOINTS.getIndicGlossaryExplorerDomainAndCollectionSource}`;
   }
 
   processResponse(res) {
     super.processResponse(res);
     if (res) {
       this.fetchDomainAndCollectionSourceData = res;
     }
   }
 
   apiEndPoint() {
     return this.endpoint;
   }
 
   getBody() {
     return this.progressObj1;
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
     return this.fetchDomainAndCollectionSourceData;
   }
 }