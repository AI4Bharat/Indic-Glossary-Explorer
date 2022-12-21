import apiStatus from './apistatus/apistatus';
import userLoginDetails from './user/login';
import uploadGlossary from  './uploadGlossary/uploadGlossary';
import addGlossary from './uploadGlossary/addGlossary';
import searchGlossary from './searchGlossary/searchGlossary';
import getAllLanguages from './getLanguages/getLanguages';
import getAllDomains from './getDomains/getDomains';
import getDomainAndCollectionSourceData from './DomainAndCollectionSource/DomainAndCollectionSource';
import getIndicGlossaryExplorerLanguageCountData from './getLanguageCount/LanguageCount';


const index = {
    apiStatus,
    userLoginDetails,
    uploadGlossary,
    addGlossary,
    searchGlossary,
    getAllLanguages,
    getAllDomains,
    getDomainAndCollectionSourceData,
    getIndicGlossaryExplorerLanguageCountData
};

export default index;