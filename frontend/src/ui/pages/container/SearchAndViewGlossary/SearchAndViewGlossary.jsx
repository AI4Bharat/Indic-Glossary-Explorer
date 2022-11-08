import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import searchGlossary from '../../../../redux/actions/api/SearchGlossary/SearchGlossary';
import CustomButton from '../../component/common/Button';
import OutlinedTextField from '../../component/common/OutlinedTextField';
import { useDispatch, useSelector } from "react-redux";
import APITransport from "../../../../redux/actions/apitransport/apitransport";
import ViewGlossary from '../../component/SearchAndViewGlossary/ViewGlossary';
import CustomizedSnackbars from '../../component/common/Snackbar';

const SearchAndViewGlossary = (props) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [showGlossaryResultTable, setShowGlossaryResultTable] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [snackbar, setSnackbarInfo] = useState({
        open: false,
        message: "",
        variant: "success",
      });

    const glossaryData = useSelector((state)=>state.searchGlossary);

    const handleTextChange = (e) => {
        setText(e.target.value);    
    }

    const onSubmit = () => {
        const apiObj = new searchGlossary(text);
        dispatch(APITransport(apiObj));
        setShowMessage(true)
    }

    useEffect(()=>{
        setShowGlossaryResultTable(false);
        return () => {
            dispatch(APITransport(new searchGlossary()));
        }
    }, [])

    useEffect(()=>{
        console.log("!glossaryData[0]?.glossaryPhrases ... ", glossaryData[0]?.glossaryPhrases);
        console.log("glossaryData[0]?.glossaryPhrases.length ----- ", glossaryData[0]?.glossaryPhrases.length);
        if(glossaryData[0]?.glossaryPhrases && glossaryData[0]?.glossaryPhrases.length > 0){
            setShowGlossaryResultTable(true);
            setShowMessage(false);
        } else if(showMessage && glossaryData[0]?.glossaryPhrases.length == 0){
            setShowMessage(false);
            setSnackbarInfo({
                open: true,
                message: "No records found.",
                variant: "error"
            })
            setShowGlossaryResultTable(false);
        } else {
            setShowGlossaryResultTable(false);
            setShowMessage(false);
        }
    }, [glossaryData])

    const onReset = () => {
        setText("");
        // const apiObj = new searchGlossary("");
        // dispatch(APITransport(apiObj));
        setShowGlossaryResultTable(false);
    }

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

    return(
        <div>
             <Grid 
            container
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
        >
            <OutlinedTextField
                placeholder="Search..."
                onChange={handleTextChange}
                value={text}
                sx={{width: {xs: 300, md: 500}}}
            />
            <CustomButton 
                label="Search"
                onClick={onSubmit}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    marginLeft: 1,
                    fontSize: '1rem'
                }}
            />
            {
                glossaryData && <CustomButton 
                label="Reset"
                onClick={onReset}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    marginLeft: 1,
                    fontSize: '1rem'
                }}
            />
            }
        </Grid>
            {showGlossaryResultTable && glossaryData && glossaryData.length > 0 && <ViewGlossary glossaryData={glossaryData[0]?.glossaryPhrases} inputText={glossaryData[0]?.input} />}
            {renderSnackBar()}
        </div>
       
    )
}

export default SearchAndViewGlossary;