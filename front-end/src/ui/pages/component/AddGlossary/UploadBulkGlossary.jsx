// UploadBulkGlossary

import { Grid } from '@mui/material';
import React, { useState } from 'react';
import CustomButton from '../../component/common/Button';
import OutlinedTextField from '../../component/common/OutlinedTextField';
import { FileUploader } from "react-drag-drop-files";

const UploadBulkGlossary = (props) => {
    const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
    return(
        <Grid 
            container
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
        >
            {/* <OutlinedTextField
                placeholder="Search..."
                sx={{width: 500}}
            /> */}
            <FileUploader handleChange={handleChange} name="file" types={['xls, xlsx, csv']} />
            <CustomButton 
                label="Upload File"
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    marginLeft: 2
                }}
            />
        </Grid>
    )
}

export default UploadBulkGlossary;