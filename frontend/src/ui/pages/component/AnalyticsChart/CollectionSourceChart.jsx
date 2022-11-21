import {
    Box,
    Button,
    Paper,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    XAxis,
    LabelList,
    YAxis,
    Tooltip,
    Label,
  } from "recharts";
//   import FetchModelChartAPI from "../../../redux/actions/api/ULCA/FetchModelChart";
  import ChartStyles from "../../../styles/ChartStyles";
  // import APITransport from "../../../redux/actions/apitransport/apitransport";
  // import CustomizedButton from "../common/CustomizedButton";
  
  const colors = [
    "188efc",
    "7a47a4",
    "b93e94",
    "1fc6a4",
    "f46154",
    "d088fd",
    "f3447d",
    "188efc",
    "f48734",
    "189ac9",
    "0e67bd",
  ];
  
  const CollectionSourceChart = (props) => {
    const dispatch = useDispatch();
    const classes = ChartStyles();
  
    const {sourceData} = props;
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [selectedType, setSelectedType] = useState("");
    const [selectedTypeName, setSelectedTypeName] = useState("");
    const [axisValue, setAxisValue] = useState({
      yAxis: "Count",
      xAxis: "Collection Source",
    });
  
    // const chartData = useSelector((state) => state.getModels.data);
  
    // const fetchChartData = (dataType, criterions, value) => {
    //   let apiObj = new FetchModelChartAPI(dataType, criterions, value);
    //   dispatch(APITransport(apiObj));
    // };
  
    useEffect(() => {
    //   fetchChartData("model", "", "");
    }, []);
  
    // useEffect(() => {
    //   setData(chartData.data);
    //   setCount(chartData.count);
    // }, [chartData]);
  
    const CustomizedAxisTick = (props) => {
      const { x, y, payload } = props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            dy={16}
            textAnchor="end"
            fill="#666"
            transform="rotate(-35)"
          >
            {payload.value &&
              payload.value.substr(0, 14) +
                (payload.value.length > 14 ? "..." : "")}
          </text>
        </g>
      );
    };
  
    // const fetchCriterions = (event) => {
    //   setSelectedType(
    //     selectedType
    //       ? selectedType
    //       : event && event.hasOwnProperty("_id") && event._id
    //   );
    //   setSelectedTypeName(
    //     selectedTypeName
    //       ? selectedTypeName
    //       : event && event.hasOwnProperty("label") && event.label
    //   );
    //   return [
    //     {
    //       field: "type",
    //       value:
    //         event && event.hasOwnProperty("_id") && event._id
    //           ? event._id
    //           : selectedType,
    //     },
    //   ];
    // };
  
    // const handleOnClick = (value, event) => {
    //   switch (value) {
    //     case 1:
    //       fetchChartData("model", fetchCriterions(event), "language");
    //       setPage(value);
    //       setAxisValue({ xAxis: "Languages", yAxis: "Count" });
    //       break;
  
    //     case 0:
    //       fetchChartData("model", "", "");
    //       setPage(value);
    //       setSelectedType("");
    //       setSelectedTypeName("");
    //       setAxisValue({ xAxis: "Task", yAxis: "Count" });
    //       break;
    //     default:
    //   }
    // };
  
    return (
      <Box className={classes.modelChartSection}>
        <Typography variant="h2" className={classes.heading}>
          Collection Source Dashboard
        </Typography>
        <Paper>
          <Box className={classes.topBar}>
            <Box className={classes.topBarInnerBox}>
              <Typography
                style={{ fontSize: "1rem", fontWeight: "600", padding: "16px 0" }}
              >
                Collection Source
              </Typography>
            </Box>
            <Box className={classes.topBarInnerBox}>
              <Typography style={{ fontSize: "0.875rem", fontWeight: "400" }}>
                Total Count
              </Typography>
              <Typography style={{ fontSize: "1.125rem", fontWeight: "400" }}>
                {sourceData?.totalCount}
              </Typography>
            </Box>
          </Box>
          {/* <CustomizedButton
            title="Reset"
            size="small"
            color="primary"
            sx={{
              visibility: page === 0 ? "hidden" : "",
              margin: "10px 0 0 20px",
            }}
            onClick={() => handleOnClick(0)}
          /> */}
            
          <Box style={{ margin: "20px" }}>
            <ResponsiveContainer width="100%" height={600}>
              <BarChart
                width={900}
                height={400}
                data={sourceData?.CollectionSources}
                fontSize="14px"
                fontFamily="Roboto"
                maxBarSize={100}
              >
                <XAxis
                  dataKey="collectionSource"
                  textAnchor={"end"}
                  tick={<CustomizedAxisTick />}
                  height={130}
                  interval={0}
                  position="insideLeft"
                  type="category"
                >
                  <Label
                    value={axisValue.xAxis}
                    position="insideBottom"
                    fontWeight="bold"
                    fontSize={16}
                  ></Label>
                </XAxis>
                <YAxis
                  padding={{ top: 80 }}
                  tickInterval={10}
                  allowDecimals={false}
                  type="number"
                  dx={0}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en", { notation: "compact" }).format(
                      value
                    )
                  }
                >
                  <Label
                    value={axisValue.yAxis}
                    angle={-90}
                    position="insideLeft"
                    fontWeight="bold"
                    fontSize={16}
                  ></Label>
                </YAxis>
  
                <Tooltip
                  contentStyle={{ fontFamily: "Roboto", fontSize: "14px" }}
                  formatter={(value) => new Intl.NumberFormat("en").format(value)}
                  cursor={{ fill: "none" }}
                />
                <Bar
                  margin={{ top: 140, left: 20, right: 20, bottom: 20 }}
                  dataKey="count"
                  cursor="pointer"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={65}
                //   onClick={(event) => handleOnClick(page + 1, event)}
                  isAnimationActive={false}
                >
                  <LabelList
                    formatter={(value) =>
                      new Intl.NumberFormat("en").format(value)
                    }
                    cursor={{ fill: "none" }}
                    position="top"
                    dataKey="value"
                    fill="black"
                    style={{ textAnchor: "start" }}
                    angle={-30}
                    clockWise={4}
                  />
                  {sourceData?.CollectionSources?.length > 0 &&
                    sourceData?.CollectionSources?.map((entry, index) => {
                      const color = colors[index < 9 ? index : index % 10];
                      return <Cell key={index} fill={`#${color}`} />;
                    })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>
    );
  };
  
  export default CollectionSourceChart;
  