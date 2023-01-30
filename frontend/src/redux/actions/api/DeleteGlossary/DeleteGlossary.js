/**
 * DeleteGlossary
 */
 import API from "../../../api";
 import ENDPOINTS from "../../../../config/apiendpoint";
 import constants from "../../../constants";
 
 export default class DeleteGlossary extends API {
   constructor(glossary_hash, timeout = 2000) {
     super("POST", timeout, false);
     this.type = constants.DELETE_GLOSSARY;
     this.glossaryHash = glossary_hash;
     this.endpoint = `${super.apiEndPoint()}${ENDPOINTS.deleteGlossary}`;
   }
 
   processResponse(res) {
     super.processResponse(res);
     if (res) {
       this.deleteGlossaryData = res;
       console.log(res);
     }
   }
 
   apiEndPoint() {
     return this.endpoint;
   }
 
   getBody() {
     let data = {
        hash: this.glossaryHash,
     } 
     return data;
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
     return this.deleteGlossaryData
   }
 }
 