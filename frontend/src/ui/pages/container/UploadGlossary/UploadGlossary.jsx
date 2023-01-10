import * as React from 'react';
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import AddIndividualGlossary from '../../component/AddGlossary/AddIndividualGlossary';
import UploadBulkGlossary from '../../component/AddGlossary/UploadBulkGlossary';

const UploadGlossary = (props) => {
    const [uploadType, setuploadType] = React.useState("File Upload");

    const handleTypeChange = (value) => {
        setuploadType(value);
    }
    return (
        <>
            <FormControl
                sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    display: "flex",
                    flexWrap: "wrap"
                }}
            >
                <Typography variant='subtitle1' sx={{marginRight : 5, fontWeight: "600"}}>Select Type : </Typography>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="File Upload"
                    sx={{
                        display: "flex",
                        flexWrap: "wrap"
                    }}
                >
                    <FormControlLabel value="Add Individual" control={<Radio />} label="Add Individual" onClick={()=>handleTypeChange("Add Individual")} />
                    <FormControlLabel value="File Upload" control={<Radio />} label="File Upload" onClick={()=>handleTypeChange("File Upload")} />
                </RadioGroup>
            </FormControl>

            <Grid sx={{marginTop: {md:10, xs: 3}}}>
                {uploadType == "Add Individual" && <AddIndividualGlossary />}
                {uploadType == "File Upload" && <UploadBulkGlossary />}
            </Grid>
        </>
    )
}

export default UploadGlossary;