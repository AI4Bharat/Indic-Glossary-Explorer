// ViewGlossary

import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import glossaryLevel from '../../../../config/glossaryLevel';

const ViewGlossary = (props) => {

    const { glossaryData, inputText } = props;

    console.log("glossaryData --- ", glossaryData);

    return (
        <Grid>
            {glossaryData && glossaryData.length > 0 && <Typography variant='h5' sx={{ marginBottom: 5, marginTop: 5 }}>{inputText}</Typography>}
            {glossaryData && glossaryData.length > 0 ? glossaryData.map((el, i) => {
                return (
                    <Grid
                        sx={{
                            borderTop: "1px dashed #000000",
                        }}
                    >
                        <Typography variant='h6' sx={{textAlign: "left"}}>{i+1}.</Typography>
                        <Typography variant='subtitle1'><b>Target Text</b> : {el.tgtText}</Typography>
                        <Typography variant='subtitle1'><b>Collection Source</b> : {el.collectionSource}</Typography>
                        <Typography variant='subtitle1'><b>Domain</b> : {el.domain}</Typography>
                        <Typography variant='subtitle1'><b>Level</b> : {glossaryLevel.filter((level)=>level.key == el.level)[0].name}</Typography>
                    </Grid>
                )
            }) : inputText && <Typography variant='subtitle1' sx={{marginTop: 5}}>No result for <b>{inputText}</b></Typography>
        }
        </Grid>
    )
}

export default ViewGlossary;