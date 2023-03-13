import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
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
import getCommaSaparatedNumber from "../../../../utils/getCommaSaparatedNumber";
//   import FetchModelChartAPI from "../../../redux/actions/api/ULCA/FetchModelChart";
  import ChartStyles from "../../../styles/ChartStyles";
import ResponsiveChartContainer from "../common/ResponsiveChartContainer";
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
  
  const LanguageCountChart = (props) => {
    const dispatch = useDispatch();
    const classes = ChartStyles();
  
    const { incomingData, totalCount, loadingChart } = props;
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [selectedType, setSelectedType] = useState("");
    const [selectedTypeName, setSelectedTypeName] = useState("");
    const [selectedSourceLang, setSelectedSourceLang] = useState('en');
    const [sourceData, setSourceData] = useState();
    const [axisValue, setAxisValue] = useState({
      yAxis: "Count",
      xAxis: "Language",
    });

    const allLanguages = useSelector((state) => state.getAllLanguages);
  
    // const chartData = useSelector((state) => state.getModels.data);
  
    // const fetchChartData = (dataType, criterions, value) => {
    //   let apiObj = new FetchModelChartAPI(dataType, criterions, value);
    //   dispatch(APITransport(apiObj));
    // };
  
    useEffect(()=>{
      setSourceData(incomingData);
    }, [incomingData])

    const handleSrcLangChange = (event) => {
      setSelectedSourceLang(event.target.value);
      props.onLanguageChange(event.target.value);
  }
  
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
          Language Dashboard
        </Typography>
        <Paper>
          <Box className={classes.topBar}>
            <Box className={classes.topBarInnerBox}>
              <Typography
                style={{ fontSize: "1rem", fontWeight: "600", padding: "16px 0" }}
              >
                Language
              </Typography>
            </Box>
            <Box className={classes.topBarInnerBox}>
              <Typography style={{ fontSize: "0.875rem", fontWeight: "400" }}>
                Total Count
              </Typography>
              <Typography style={{ fontSize: "1.125rem", fontWeight: "400" }}>
                {totalCount
                ? new Intl.NumberFormat("en").format(totalCount)
                : 0}
              </Typography>
            </Box>
          </Box>
          <Grid 
            container
            direction="row"
            alignItems={'center'}
            sx={{textAlign: 'left', margin: {md: 5, xs: 1}}}
          >
              <Typography variant='h6'>
                  Number of parallel Glossary per language with 
              </Typography>
              <Box sx={{marginLeft: {md: 5, xs: 0}}}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: {md: 200, xs: "150%"} }}>
                    <InputLabel id="demo-simple-select-helper-label">Source Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={selectedSourceLang}
                        label="Source Language"
                        onChange={handleSrcLangChange}
                        sx={{
                            textAlign: "left",
                            border: '0px solid transparent'
                        }}
                    >
                        {allLanguages && allLanguages.length > 0 && allLanguages.map((el, i) => {
                            return <MenuItem value={el.code}>{el.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
              </Box>
              <Typography variant='h6'>
                  ({sourceData?.totalCount
                ? new Intl.NumberFormat("en").format(sourceData?.totalCount)
                : 0})
              </Typography>
              {/* <Typography style={{ fontSize: "1.125rem", fontWeight: "400" }}>
                {getCommaSaparatedNumber(sourceData?.totalCount)}
              </Typography> */}
            </Grid>
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
            {!loadingChart ? (<ResponsiveChartContainer>
              <BarChart
                width={900}
                height={400}
                data={sourceData?.languages}
                fontSize="14px"
                fontFamily="Roboto"
                maxBarSize={100}
              >
                <XAxis
                  dataKey="label"
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
                  {sourceData?.languages?.length > 0 &&
                    sourceData?.languages?.map((entry, index) => {
                      const color = colors[index < 9 ? index : index % 10];
                      return <Cell key={index} fill={`#${color}`} />;
                    })}
                </Bar>
              </BarChart>
            </ResponsiveChartContainer>) : (
            <Box display="flex" justifyContent="center">
              <CircularProgress
                color="primary"
                size={50}
                style={{ margin: "20%" }}
              />
            </Box>
          )}
          </Box>
        </Paper>
      </Box>
    );
  };
  
  export default LanguageCountChart;
  