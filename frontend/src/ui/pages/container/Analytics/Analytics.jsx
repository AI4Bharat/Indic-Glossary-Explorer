import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import APITransport from '../../../../redux/actions/apitransport/apitransport';
import DomainChart from '../../component/AnalyticsChart/DomainChart';
import CollectionSourceChart from "../../component/AnalyticsChart/CollectionSourceChart";
import FetchDomainAndCollectionSourceData from "../../../../redux/actions/api/DomainAndCollectionSource/DomainAndCollectionSource";
import FetchLanguageCountData from "../../../../redux/actions/api/getLanguageCount/LanguageCount";
import LanguageCountChart from "../../component/AnalyticsChart/LanguageCountChart";


const Analytics = () => {
  const dispatch = useDispatch()

  const [langCountData, setLangCountData] = useState();
  const [domainChartData, setDomainChartData] = useState();
  const [collectionSourceChartData, setCollectionSourceChartData] = useState(); 

  const LanguageChartData = useSelector(state=>state.getIndicGlossaryExplorerLanguageCountData.data);
  const chartData = useSelector(state=>state.getDomainAndCollectionSourceData.data);

//   useEffect(()=>{
//     let apiObj = new FetchDomainAndCollectionSourceData();
//     dispatch(APITransport(apiObj))
//   },[])

  useEffect(()=>{
    fetchLanguageCountChartData();
    fetchDomainCollectionChartData();   
  },[])

  const fetchDomainCollectionChartData = () => {
    let apiObj = new FetchDomainAndCollectionSourceData();
    dispatch(APITransport(apiObj))
  }

  const fetchLanguageCountChartData = () => {
    let apiObj = new FetchLanguageCountData();
    dispatch(APITransport(apiObj))
  }

  useEffect(()=>{
    setLangCountData(LanguageChartData[0]);
    setDomainChartData(chartData[0]);
    setCollectionSourceChartData(chartData[1]);
  }, [chartData])

  return (
    <>
    {langCountData && <LanguageCountChart sourceData = {langCountData} />}
      {domainChartData && <DomainChart sourceData = {domainChartData} />}
      {collectionSourceChartData && <CollectionSourceChart sourceData = {collectionSourceChartData} />}
    </>

  );
};

export default Analytics;
