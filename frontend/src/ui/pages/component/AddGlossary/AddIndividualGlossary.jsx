// AddIndividualGlossary

import { Grid } from '@mui/material';
import React from 'react';
import CustomButton from '../../component/common/Button';
import OutlinedTextField from '../../component/common/OutlinedTextField';

const AddIndividualGlossary = (props) => {
    return(
        <Grid 
            container
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
        >
            <OutlinedTextField
                placeholder="Search..."
                sx={{width: 500}}
            />
            <CustomButton 
                label="Search Glossary"
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    marginLeft: 2
                }}
            />
        </Grid>
    )
}

export default AddIndividualGlossary;