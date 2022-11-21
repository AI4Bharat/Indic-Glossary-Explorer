import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import APITransport from '../../../../redux/actions/apitransport/apitransport';
import DomainChart from '../../component/AnalyticsChart/DomainChart';
import CollectionSourceChart from "../../component/AnalyticsChart/CollectionSourceChart";
import FetchDomainAndCollectionSourceData from "../../../../redux/actions/api/DomainAndCollectionSource/DomainAndCollectionSource";


const Analytics = () => {
  const dispatch = useDispatch()

  const [domainChartData, setDomainChartData] = useState();
  const [collectionSourceChartData, setCollectionSourceChartData] = useState(); 

  const chartData = useSelector(state=>state.getDomainAndCollectionSourceData.data);

  useEffect(()=>{
    let apiObj = new FetchDomainAndCollectionSourceData();
    dispatch(APITransport(apiObj))
  },[])

  useEffect(()=>{
    setDomainChartData(chartData[0]);
    setCollectionSourceChartData(chartData[1]);
  }, [chartData])

  return (
    <>
      {domainChartData && <DomainChart sourceData = {domainChartData} />}
      {collectionSourceChartData && <CollectionSourceChart sourceData = {collectionSourceChartData} />}
    </>

  );
};

export default Analytics;
