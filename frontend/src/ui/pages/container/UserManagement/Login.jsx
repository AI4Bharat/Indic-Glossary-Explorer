import {
  Grid,
  Link,
  Typography,
  Hidden,
  ThemeProvider,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { translate } from "../../../../config/localisation";
//   import LoginAPI from "../../../../redux/actions/api/UserManagement/Login";
import LoginStyle from "../../../styles/loginStyle";
import Button from "../../component/common/Button";
import CustomCard from "../../component/common/Card";
import OutlinedTextField from "../../component/common/OutlinedTextField";
import themeDefault from "../../../theme/theme";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Logo from "../../../../assets/logo.svg";
import AppInfo from "./AppInfo";
import CustomizedSnackbars from "../../component/common/Snackbar";
import LoginAPI from "../../../../redux/actions/api/user/Login";
import { useDispatch, useSelector } from "react-redux";
import APITransport from "../../../../redux/actions/apitransport/apitransport";
import { authenticateUser } from "../../../../utils/utils";


const Login = () => {
  const classes = LoginStyle();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [snackbar, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });

  const [isPressed, setIsPressed] = useState(false);

  const keyPress = (e) => {
    if (e.code === "Enter") {
      if (!isPressed) {
        setIsPressed(true);
          onLoginClick();
      }
    }
  };

  const keyRelease = () => {
    setIsPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", keyPress);
    window.addEventListener("keyup", keyRelease);
    return () => {
      window.removeEventListener("keydown", keyPress);
      window.removeEventListener("keyup", keyRelease);
    }
  }, [keyPress, keyRelease]);

  const handleFieldChange = (event) => {
    event.preventDefault();
    setCredentials((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const userData = useSelector((state)=>state.userLoginDetails.data);
  const apiStatus = useSelector((state)=>state.apiStatus);

  useEffect(()=>{
    if(apiStatus.error && apiStatus.message){
      setSnackbarInfo({
        open: true,
        message: apiStatus.message,
        variant: "error",
      })
    }
  }, [apiStatus]);

  useEffect(()=>{
      console.log("userData --- ", userData);
      const token = localStorage.getItem("access_token");
      if(token){
        navigate("/view-glossary")
      }
  }, [userData])

  const onLoginClick = () => {
    const apiObj = new LoginAPI(credentials.email, credentials.password);
    dispatch(APITransport(apiObj));
  }

  const TextFields = () => {
    return (
      <Grid container spacing={2} style={{ marginTop: "2px" }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <OutlinedTextField
            fullWidth
            name="email"
            onChange={handleFieldChange}
            value={credentials["email"]}
            placeholder={translate("enterEmailId")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <OutlinedTextField
            fullWidth
            name="password"
            type={values.showPassword ? "text" : "password"}
            onChange={handleFieldChange}
            value={credentials["password"]}
            placeholder={translate("enterPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    );
  };
  const renderCardContent = () => (
    <CustomCard title={"Sign in to " + translate("label.appName")} cardContent={TextFields()}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button
            fullWidth
            onClick={onLoginClick}
            label={"Login"}
          />
        </Grid>
      </Grid>
    </CustomCard>
  );



  const renderSnackBar = () => {
    return (
      <CustomizedSnackbars
        open={snackbar.open}
        handleClose={() =>
          setSnackbarInfo({ open: false, message: "", variant: "" })
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant={snackbar.variant}
        message={snackbar.message}
      />
    );
  };

  return (
    <ThemeProvider theme={themeDefault}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          lg={3}
          color={"primary"}
          className={classes.appInfo}
        >
          <AppInfo />
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} className={classes.parent}>
          <form autoComplete="off">{renderCardContent()}</form>
        </Grid>
        {renderSnackBar()}

      </Grid>
    </ThemeProvider>
  );
};

export default Login;
