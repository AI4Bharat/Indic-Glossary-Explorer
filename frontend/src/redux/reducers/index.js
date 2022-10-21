import apiStatus from './apistatus/apistatus';
import userLoginDetails from './user/login';
import uploadGlossary from  './uploadGlossary/uploadGlossary';
import addGlossary from './uploadGlossary/addGlossary';
import searchGlossary from './searchGlossary/searchGlossary';
import getAllLanguages from './getLanguages/getLanguages';
import getAllDomains from './getDomains/getDomains';

const index = {
    apiStatus,
    userLoginDetails,
    uploadGlossary,
    addGlossary,
    searchGlossary,
    getAllLanguages,
    getAllDomains
};

export default index;