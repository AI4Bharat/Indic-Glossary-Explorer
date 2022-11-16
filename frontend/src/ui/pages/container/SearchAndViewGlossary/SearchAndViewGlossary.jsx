import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import searchGlossary from '../../../../redux/actions/api/SearchGlossary/SearchGlossary';
import CustomButton from '../../component/common/Button';
import OutlinedTextField from '../../component/common/OutlinedTextField';
import { useDispatch, useSelector } from "react-redux";
import APITransport from "../../../../redux/actions/apitransport/apitransport";
import ViewGlossary from '../../component/SearchAndViewGlossary/ViewGlossary';
import CustomizedSnackbars from '../../component/common/Snackbar';
import getLanguages from '../../../../redux/actions/api/getLanguages/getLanguages';
import getDomains from '../../../../redux/actions/api/getDomains/getDomains';

const SearchAndViewGlossary = (props) => {
    const {showTableInside} = props;
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [selectedTargetLang, setSelectedTargetLang] = useState('');
    const [domain, setDomain] = useState('');
    const [showGlossaryResultTable, setShowGlossaryResultTable] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [snackbar, setSnackbarInfo] = useState({
        open: false,
        message: "",
        variant: "success",
    });

    const [isPressed, setIsPressed] = useState(false);

    const glossaryData = useSelector((state) => state.searchGlossary);
    const allLanguages = useSelector((state) => state.getAllLanguages);
    const allDomains = useSelector((state) => state.getAllDomains);

    useEffect(() => {
        const langApiObj = new getLanguages();
        dispatch(APITransport(langApiObj));

        const domainApiObj = new getDomains();
        dispatch(APITransport(domainApiObj));

    }, []);

    const keyPress = (e) => {
        if (e.code === "Enter") {
          if (!isPressed) {
            setIsPressed(true);
            onSubmit();
          }
        }
      };
    
      const keyRelease = () => {
        setIsPressed(false);
      };

    useEffect(() => {
        window.addEventListener("keydown", keyPress);
        window.addEventListener("keyup", keyRelease);
        return () => {
          window.removeEventListener("keydown", keyPress);
          window.removeEventListener("keyup", keyRelease);
        }
      }, [keyPress, keyRelease]);

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleTrgLangChange = (event) => {
        setSelectedTargetLang(event.target.value);
    }

    const handleDomainChange = (event) => {
        setDomain(event.target.value)
    }

    const onSubmit = () => {

        if (!selectedTargetLang) {
            return setSnackbarInfo({
                open: true,
                message: "Target language missing!",
                variant: "error"
            })
        } else if (!text) {
            return setSnackbarInfo({
                open: true,
                message: "Enter sentence to search!",
                variant: "error"
            })
        } else {
            const apiObj = new searchGlossary(text, selectedTargetLang, domain);
            dispatch(APITransport(apiObj));
            setShowMessage(true)
        }


    }

    useEffect(() => {
        setShowGlossaryResultTable(false);
        return () => {
            dispatch(APITransport(new searchGlossary()));
        }
    }, [])

    useEffect(() => {
        console.log("!glossaryData[0]?.glossaryPhrases ... ", glossaryData[0]?.glossaryPhrases);
        console.log("glossaryData[0]?.glossaryPhrases.length ----- ", glossaryData[0]?.glossaryPhrases.length);
        if (glossaryData[0]?.glossaryPhrases && glossaryData[0]?.glossaryPhrases.length > 0) {
            setShowGlossaryResultTable(true);
            setShowMessage(false);
        } else if (showMessage && glossaryData[0]?.glossaryPhrases.length == 0) {
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
        setSelectedTargetLang("");
        setDomain("");
        // const apiObj = new searchGlossary("");
        // dispatch(APITransport(apiObj));
        setShowGlossaryResultTable(false);
        const apiObj = new searchGlossary("", selectedTargetLang, domain);
        dispatch(APITransport(apiObj));
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

    return (
        <div>
            <Grid
                container
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item
                    sx={{ padding: 0, width: '25%' }}
                >
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-helper-label" required>Target Language</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedTargetLang}
                            label="Target Language"
                            onChange={handleTrgLangChange}
                            sx={{
                                textAlign: "left",
                                backgroundColor: "#ffffff" 
                            }}
                        >
                            {allLanguages && allLanguages.length > 0 && allLanguages.map((el, i) => {
                                return <MenuItem value={el.code}>{el.label}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item
                    sx={{ padding: 0, width: '50%' }}
                >
                    <FormControl sx={{ width: '100%' }}>
                        <OutlinedTextField
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            placeholder="Search term..."
                            onChange={handleTextChange}
                            value={text}
                            fullWidth
                            sx={{
                                backgroundColor: "#ffffff"
                            }}
                        />
                    </FormControl>

                </Grid>
                <Grid item
                    sx={{ padding: 0, width: '25%' }}
                >
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-helper-label">Domain (Optional)</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={domain}
                            label="Domain (Optional)"
                            onChange={handleDomainChange}
                            sx={{
                                textAlign: "left",
                                backgroundColor: "#ffffff"
                            }}
                        >
                            {allDomains && allDomains.length > 0 && allDomains.map((el, i) => {
                                return <MenuItem value={el.code}>{el.label}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                
            </Grid>
            <Grid
                container
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: showTableInside ? 2 : 0.5 }}
                spacing={2}
            >
                <Grid item
                    sx={{ padding: 0, width: (selectedTargetLang || domain || text) ? '50%' : '100%' }}
                >
                    <CustomButton
                        label="Search"
                        onClick={onSubmit}
                        fullWidth
                        sx={{
                            padding: 4,
                            borderRadius: 2,
                            fontSize: '1rem',
                        }}
                    />
                </Grid>

                {
                    (selectedTargetLang || domain || text) && <Grid item
                        sx={{ padding: 0, width: '50%' }}
                    ><CustomButton
                            label="Reset"
                            onClick={onReset}
                            fullWidth
                            sx={{
                                padding: 4,
                                borderRadius: 2,
                                fontSize: '1rem'
                            }}
                        /></Grid>
                }
            </Grid>
            {showTableInside && showGlossaryResultTable && glossaryData && glossaryData.length > 0 && <ViewGlossary glossaryData={glossaryData[0]?.glossaryPhrases} inputText={glossaryData[0]?.input} />}
            {renderSnackBar()}
        </div>

    )
}

export default SearchAndViewGlossary;