import { Grid } from '@mui/material';
import React, { useState } from 'react';
import searchGlossary from '../../../../redux/actions/api/SearchGlossary/SearchGlossary';
import CustomButton from '../../component/common/Button';
import OutlinedTextField from '../../component/common/OutlinedTextField';
import { useDispatch, useSelector } from "react-redux";
import APITransport from "../../../../redux/actions/apitransport/apitransport";

const SearchAndViewGlossary = (props) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const handleTextChange = (e) => {
        setText(e.target.value);    
    }

    const onSubmit = () => {
        const apiObj = new searchGlossary(text);
        dispatch(APITransport(apiObj));
    }

    return(
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
                sx={{width: 500}}
            />
            <CustomButton 
                label="Search Glossary"
                onClick={onSubmit}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    marginLeft: 2
                }}
            />
        </Grid>
    )
}

export default SearchAndViewGlossary;