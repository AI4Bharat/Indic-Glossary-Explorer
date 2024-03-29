import { makeStyles } from '@mui/styles';

const ChartStyles = makeStyles({
    chartSection: {
        backgroundColor: "#F3F5F7",
        padding: "5% 15%"
    },

  modelChartSection: {
    padding: "5% 0%",
  },

  heading: {
    textAlign: "center",
    marginBottom: "35px !important",
    color: "#3A3A3A",
    fontSize: "2.5rem",
    fontWeight: 400,
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#DEECFF",
    fontSize: "18px",
  },

  topBarInnerBox: {
    width: "-webkit-fill-available",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    boxShadow: "3px 0 2px -2px #00000029",
  },

  titleStyle: {
    marginLeft: "25px",
    display: "flex",
    "@media (max-width:740px)": {
      marginRight: "0",
      display: "flex",
      flexDirection: "column",
    },
  },

  dropDownStyle: {
    display: "flex",
    marginLeft: ".68rem",
  },

  titleText: {
    marginLeft: "1.68rem",
    marginRight: ".5rem",
  },

  titleDropdown: {
    marginLeft: "1rem",
    minWidth: "10rem",
  },

  filterButton: {
    marginLeft: "auto",
    paddingRight: "1.5%",
    minWidth: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  fiterText: {
    marginTop: "3px",
    marginRight: "1.3rem",
    "@media (max-width:800px)": {
      display: "none",
    },
  },

  backButton: {
    boxShadow: "none",
    paddingTop: "5px",
    marginRight: ".5rem",
    borderRadius: "0",
  },
});

export default ChartStyles;
