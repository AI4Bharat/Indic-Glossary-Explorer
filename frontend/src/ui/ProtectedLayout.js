import React, { Suspense, useEffect, useState } from "react";

// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  ThemeProvider,  } from "@mui/material";
import themeDefault from './theme/theme'
import GlobalStyles from "./styles/LayoutStyles";
// import BackButton from "./pages/component/common/BackButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { translate } from "../config/localisation";
// import Header from "./pages/component/common/Header";
const Header = React.lazy(() => import("./pages/component/common/Header"));


const Layout= (props) => {
  const { type, index, userRoles, component,Backbutton, backPressNavigationPath } = props;
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
            // type={type}
            // index={index}
            // className={classes.headerContainer}
          />
        </Suspense>
        <div 
        className={classes.container}
        >
          {/* {renderSpinner()}
          {renderError()} */}
          {/* { Backbutton  && 
           < BackButton startIcon={<  ArrowBackIcon />} sx={{ color:"white" ,   mb:2  }} backPressNavigationPath={backPressNavigationPath ? backPressNavigationPath : ""} label={translate("label.backToPreviousPage")}/>
           } */}
          <Suspense fallback={<div>Loading....</div>}>
            {component}
          </Suspense>
        </div>
       
      </div>
  );
}
export default Layout;
