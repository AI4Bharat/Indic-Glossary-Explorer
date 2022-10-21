import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import searchGlossary from '../../../../redux/actions/api/SearchGlossary/SearchGlossary';
import CustomButton from '../../component/common/Button';
import OutlinedTextField from '../../component/common/OutlinedTextField';
import { useDispatch, useSelector } from "react-redux";
import APITransport from "../../../../redux/actions/apitransport/apitransport";
import ViewGlossary from '../../component/SearchAndViewGlossary/ViewGlossary';

const SearchAndViewGlossary = (props) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [showGlossaryResultTable, setShowGlossaryResultTable] = useState(false);

    const glossaryData = useSelector((state)=>state.searchGlossary);

    const handleTextChange = (e) => {
        setText(e.target.value);    
    }

    const onSubmit = () => {
        const apiObj = new searchGlossary(text);
        dispatch(APITransport(apiObj));
    }

    useEffect(()=>{
        setShowGlossaryResultTable(true);
    }, [glossaryData])

    const onReset = () => {
        setText("");
        // const apiObj = new searchGlossary("");
        // dispatch(APITransport(apiObj));
        setShowGlossaryResultTable(false);
    }

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
            {
                glossaryData && <CustomButton 
                label="Reset"
                onClick={onReset}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    marginLeft: 2
                }}
            />
            }
        </Grid>
            {showGlossaryResultTable && glossaryData && glossaryData.length > 0 && <ViewGlossary glossaryData={glossaryData[0]?.glossaryPhrases} inputText={glossaryData[0]?.input} />}
        </div>
       
    )
}

export default SearchAndViewGlossary;