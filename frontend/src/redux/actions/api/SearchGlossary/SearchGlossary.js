/**
 * searchGlossary
 */
 import API from "../../../api";
 import ENDPOINTS from "../../../../config/apiendpoint";
 import constants from "../../../constants";
 
 export default class searchGlossary extends API {
   constructor(searchText="", timeout = 2000) {
     super("POST", timeout, false);
     this.type = constants.SEARCH_GLOSSARY;
     this.searchText = searchText;
     this.endpoint = `${super.apiEndPoint()}${ENDPOINTS.searchGlossary}`;
   }
 
   processResponse(res) {
     super.processResponse(res);
     if (res) {
         this.searchData = res;
         console.log(res);
     }
 }
 
   apiEndPoint() {
     return this.endpoint;
   }
 
   getBody() {
    const data = {
        inputs:[this.searchText],
    }
     return JSON.stringify(data);
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
     return this.searchData
   }
 }
 