// ViewGlossary

import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import searchGlossary from '../../../../redux/actions/api/SearchGlossary/SearchGlossary';
import CustomButton from '../../component/common/Button';
import OutlinedTextField from '../../component/common/OutlinedTextField';
import { useDispatch, useSelector } from "react-redux";
import APITransport from "../../../../redux/actions/apitransport/apitransport";
import glossaryLevel from '../../../../config/glossaryLevel';

const ViewGlossary = (props) => {

    const { glossaryData, inputText } = props;

    return (
        <Grid
            // container
            // justifyContent="center"
            // alignItems="center"
        >
            <Typography variant='h5' sx={{ marginBottom: 5, marginTop: 5 }}>{inputText}</Typography>
            {glossaryData.map((el, i) => {
                return (
                    <Grid
                        sx={{
                            borderTop: "1px dashed #000000"
                        }}
                    >
                        <Typography variant='h6' sx={{textAlign: "left"}}>{i+1}</Typography>
                        <Typography variant='subtitle1'><b>Target Text</b> : {el.tgtText}</Typography>
                        <Typography variant='subtitle1'><b>Collection Source</b> : {el.collectionSource}</Typography>
                        <Typography variant='subtitle1'><b>Domain</b> : {el.domain}</Typography>
                        <Typography variant='subtitle1'><b>Level</b> : {glossaryLevel.filter((level)=>level.key == el.level)[0].name}</Typography>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default ViewGlossary;