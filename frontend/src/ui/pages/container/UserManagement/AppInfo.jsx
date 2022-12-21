
import { Grid, Link, Typography, Hidden, ThemeProvider, Box, } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { translate } from "../../../../config/localisation";
import LoginStyle from "../../../styles/loginStyle";
import themeDefault from '../../../theme/theme'



export default function AppInfo() {
    let navigate = useNavigate();
    const classes = LoginStyle();
    return (
        <div>
            <Grid container sx={{
                marginLeft: 4,
                marginTop: 4,
                textAlign: "left"
            }}>

                <Hidden only="xs">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                        <span style={{
                            display: "inline-block",
                            borderRadius: "70px",
                            padding: "8px",
                            backgroundColor: "#ffffff",
                            contain: "content"
                        }}>
                            <img
                                src={"glossary-explorer-logo.png"}
                                alt="logo"
                                width={100}

                            />
                        </span>

                    </Grid>
                </Hidden>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                    <Typography
                        variant={"h2"}
                        className={classes.title}
                        sx={{
                            marginTop: 10,
                            width: "98%"
                        }}
                    // onClick={routeChange}
                    >{translate("label.appName")}</Typography>
                </Grid>
                <Hidden only="xs">
                    <Typography
                        variant={"body1"}
                        className={classes.body}
                        sx={{
                            marginTop: 10
                        }}
                    >
                        {translate("label.appInfo")}
                    </Typography>
                </Hidden>


            </Grid>
        </div>
    )
}
