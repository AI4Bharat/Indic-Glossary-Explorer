import React, { Suspense, useEffect, useState } from "react";

// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  Card, Grid, ThemeProvider,  } from "@mui/material";
import themeDefault from './theme/theme'
import GlobalStyles from "./styles/LayoutStyles";
// import BackButton from "./pages/component/common/BackButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { translate } from "../config/localisation";
import { authenticateUser } from "../utils/utils";
// import Header from "./pages/component/common/Header";
const Header = React.lazy(() => import("./pages/component/common/Header"));


const Layout= (props) => {
  const { type, index, userRoles, component,Backbutton, backPressNavigationPath, screenTitle } = props;
  const [show, setShow] = useState(false);
  const [popUp, setPopup] = useState(true);
//   const apiStatus = useSelector((state) => state.apiStatus);

  const classes = GlobalStyles();
  let navigate = useNavigate();
  
  const handleClose = () => {
    setPopup(false);
  };

  useEffect(() => {
    if (show) {
      window.removeEventListener('scroll', (e) => { });
    }
  }, [show])

  // useEffect(()=>{
  //   if(!authenticateUser()){
  //     navigate('/')
  //   }
  // },[])

  window.addEventListener('scroll', e => {
    if (window.pageYOffset > 100 && !show) {
        setShow(true);
    }
  })

  useEffect(() => {
    if (localStorage.getItem('rtl') === "true") {
      let style = document.createElement('style');
      style.innerHTML = 'input, textarea { direction: RTL; }'
      document.head.appendChild(style);
    }
  }, []);

  return (
      <div 
      className={classes.root}
      >
        <Suspense fallback={<div>Loading....</div>}>
          <Header
            publicHeader={false}
            screenTitle={screenTitle}
            // type={type}
            // index={index}
            // className={classes.headerContainer}
          />
        </Suspense>
        <Grid
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
            >


        <Card 
        className={classes.container}
        >
          {/* {renderSpinner()}
          {renderError()} */}
          {/* { Backbutton  && 
           < BackButton startIcon={<  ArrowBackIcon />} sx={{ color:"white" ,   mb:2  }} backPressNavigationPath={backPressNavigationPath ? backPressNavigationPath : ""} label={translate("label.backToPreviousPage")}/>
           } */}
          <Suspense fallback={<div>Loading....</div>}>
            <div style={{margin: "30px"}}>
              {component}
            </div>
          </Suspense>
        </Card>
       </Grid>
      </div>
  );
}
export default Layout;
