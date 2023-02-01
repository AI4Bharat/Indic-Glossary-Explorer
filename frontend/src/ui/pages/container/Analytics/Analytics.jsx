import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import APITransport from '../../../../redux/actions/apitransport/apitransport';
import DomainChart from '../../component/AnalyticsChart/DomainChart';
import CollectionSourceChart from "../../component/AnalyticsChart/CollectionSourceChart";
import FetchDomainAndCollectionSourceData from "../../../../redux/actions/api/DomainAndCollectionSource/DomainAndCollectionSource";
import FetchLanguageCountData from "../../../../redux/actions/api/getLanguageCount/LanguageCount";
import LanguageCountChart from "../../component/AnalyticsChart/LanguageCountChart";
import getLanguages from "../../../../redux/actions/api/getLanguages/getLanguages";


const Analytics = () => {
  const dispatch = useDispatch()

  const [langCountData, setLangCountData] = useState();
  const [domainChartData, setDomainChartData] = useState();
  const [collectionSourceChartData, setCollectionSourceChartData] = useState(); 
  const [loadingLanguageChart, setLoadingLanguageChart] = useState(true)
  const [loadingChart, setLoadingChart] = useState(true)

  const LanguageChartData = useSelector(state=>state.getIndicGlossaryExplorerLanguageCountData.data);
  const chartData = useSelector(state=>state.getDomainAndCollectionSourceData.data);

//   useEffect(()=>{
//     let apiObj = new FetchDomainAndCollectionSourceData();
//     dispatch(APITransport(apiObj))
//   },[])

  useEffect(()=>{
    setLoadingChart(true);
    setLoadingLanguageChart(true);
    fetchAllLanguages();

    let apiObj = new FetchLanguageCountData("en");
    dispatch(APITransport(apiObj))

    fetchDomainCollectionChartData();   
  },[])

  useEffect(()=>{
    if(langCountData){
      setLoadingLanguageChart(false)
    }

    if(domainChartData || collectionSourceChartData){
      setLoadingChart(false);
    }

  },[langCountData, domainChartData, collectionSourceChartData])

  const fetchAllLanguages = () => {
    const langApiObj = new getLanguages();
    dispatch(APITransport(langApiObj));
  }

  const fetchDomainCollectionChartData = () => {
    let apiObj = new FetchDomainAndCollectionSourceData();
    dispatch(APITransport(apiObj))
  }

  const fetchLanguageCountChartData = (srcLanguage) => {
    const languageData = getSortedAndFilteredLangCountDataBySrcLang(srcLanguage)
    languageData[0]?.languages?.sort((a, b) => b.count - a.count);
    setLangCountData(languageData[0]);
  }

  const getSortedAndFilteredLangCountDataBySrcLang = (srcLang) => {
    const modifiedLanguageChartData = [];
    let totalCount = 0;
    LanguageChartData?.languages?.map((el,i)=>{
      if(el.srcLanguage === srcLang){
        modifiedLanguageChartData.push(el);
        totalCount = totalCount + el.count;
      }
    });

    return [{languages: modifiedLanguageChartData, totalCount: totalCount}];

  }

  useEffect(()=>{
    const languageData = getSortedAndFilteredLangCountDataBySrcLang("en")
    languageData[0]?.languages?.sort((a, b) => b.count - a.count);
    chartData[0]?.domains?.sort((a, b) => b.count - a.count);
    chartData[1]?.CollectionSources?.sort((a, b) => b.count - a.count);
    setLangCountData(languageData[0]);
    setDomainChartData(chartData[0]);
    setCollectionSourceChartData(chartData[1]);
  }, [chartData, LanguageChartData])

  return (
    <>
    <LanguageCountChart incomingData = {langCountData} totalCount = {LanguageChartData?.totalcount} loadingChart={loadingLanguageChart} onLanguageChange={fetchLanguageCountChartData} />
      <DomainChart sourceData = {domainChartData} loadingChart={loadingChart} />
      <CollectionSourceChart sourceData = {collectionSourceChartData} loadingChart={loadingChart} />
    </>

  );
};

export default Analytics;
