// UploadBulkGlossary

import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomButton from '../../component/common/Button';
import OutlinedTextField from '../../component/common/OutlinedTextField';
import { FileUploader } from "react-drag-drop-files";
import { DropzoneArea } from "material-ui-dropzone";
import CustomizedSnackbars from "../../component/common/Snackbar";
import FileUploadStyles from '../../../styles/fileUpload';
import uploadGlossary from '../../../../redux/actions/api/uploadGlossary/uploadGlossary';
import { useDispatch, useSelector } from 'react-redux';
import APITransport from "../../../../redux/actions/apitransport/apitransport";


const UploadBulkGlossary = (props) => {
  const classes = FileUploadStyles();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [snackbar, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });

  const uploadStatus = useSelector((state)=>state.uploadGlossary);
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
    if(uploadStatus.status && uploadStatus.message){
      setSnackbarInfo({
        open: true,
        message: uploadStatus.message,
        variant: "success",
      })
    }
  },[uploadStatus])

  const onUploadClick = () => {
    const apiObj = new uploadGlossary(file);
    dispatch(APITransport(apiObj));
    setFile(null)
  }

  const handleAddFile = (file) => {
    setFile(file);
  };
  const handleRemoveFile = () => {
    setFile(null);
  };

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
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {/* <OutlinedTextField
                placeholder="Search..."
                sx={{width: 500}}
            /> */}
      {/* <FileUploader handleChange={handleAddFile} name="file" types={['xls, xlsx']} classes={classes.dropZoneArea} /> */}
      <Grid item xs={12} sm={5} lg={5} xl={5}>
        <DropzoneArea
          className={classes.DropZoneArea}
          showPreviewsInDropzone
          // key= {this.state.key}
          dropZoneClass={classes.dropZoneArea}
          acceptedFiles={[".xls", ".xlsx"]}
          onChange={handleAddFile}
          filesLimit={1}
          // clearOnUnmount = {this.state.cleared}
          maxFileSize={200000000}
          dropzoneText={"Please Add / Drop xls / xlsx document here"}
          onDelete={handleRemoveFile}
        />
      </Grid>

      <CustomButton
        label="Upload File"
        disabled = {!file}
        onClick={onUploadClick}
        sx={{
          width: "460px",
          padding: 4,
          borderRadius: 2,
          marginLeft: 2,
          marginTop: 5,
        }}
      />
      {renderSnackBar()}
    </Grid>
  )
}

export default UploadBulkGlossary;