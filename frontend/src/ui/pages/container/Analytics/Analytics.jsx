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
    fetchLanguageCountChartData();
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
    setLoadingLanguageChart(true);
    let apiObj = new FetchLanguageCountData(srcLanguage);
    dispatch(APITransport(apiObj))
  }

  useEffect(()=>{
    LanguageChartData[0]?.languages?.sort((a, b) => b.count - a.count);
    chartData[0]?.domains?.sort((a, b) => b.count - a.count);
    chartData[1]?.CollectionSources?.sort((a, b) => b.count - a.count);
    setLangCountData(LanguageChartData[0]);
    setDomainChartData(chartData[0]);
    setCollectionSourceChartData(chartData[1]);
  }, [chartData, LanguageChartData])

  return (
    <>
    <LanguageCountChart sourceData = {langCountData} loadingChart={loadingLanguageChart} onLanguageChange={fetchLanguageCountChartData} />
      <DomainChart sourceData = {domainChartData} loadingChart={loadingChart} />
      <CollectionSourceChart sourceData = {collectionSourceChartData} loadingChart={loadingChart} />
    </>

  );
};

export default Analytics;
