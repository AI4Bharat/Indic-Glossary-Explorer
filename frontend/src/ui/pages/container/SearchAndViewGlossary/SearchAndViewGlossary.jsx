import { FormControl, Grid, InputLabel, MenuItem, Select, Switch, FormControlLabel, TextField, Tooltip, Typography } from '@mui/material';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { IndicTransliterate, getTransliterationLanguages } from "@ai4bharat/indic-transliterate"
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
    const { showTableInside } = props;
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [selectedTargetLang, setSelectedTargetLang] = useState('');
    const [domain, setDomain] = useState('');
    const [showGlossaryResultTable, setShowGlossaryResultTable] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [enableTrasliteration, setEnableTrasliteration] = useState(true);
    const [tansliterationLanguageList, setTansliterationLanguageList] = useState([]);
    const [selectedTransliterationLang, setSelectedTransliterationLang] = useState("");
    const [snackbar, setSnackbarInfo] = useState({
        open: false,
        message: "",
        variant: "success",
    });

    const [isSearchInputActive, setIsSearchInputActive] = useState(false);
    const searchInputRef = useRef(null);

    const [isPressed, setIsPressed] = useState(false);

    const glossaryData = useSelector((state) => state.searchGlossary);
    const allLanguages = useSelector((state) => state.getAllLanguages);
    const allDomains = useSelector((state) => state.getAllDomains);

    useEffect(() => {
        const langApiObj = new getLanguages();
        dispatch(APITransport(langApiObj));

        const domainApiObj = new getDomains();
        dispatch(APITransport(domainApiObj));

        getTransliterationLanguages()
            .then(lang => {
                setTansliterationLanguageList(lang)
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    const keyPress = (e) => {
        if (e.code === "Enter") {
            if (!isPressed && isSearchInputActive) {
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
        // setText(val)
        setText(e.target.value);
    }

    const handleTrgLangChange = (event) => {
        setSelectedTargetLang(event.target.value);
    }

    const handleDomainChange = (event) => {
        setDomain(event.target.value)
    }

    const handleTransliterationLangChange = (event) => {
        setSelectedTransliterationLang(event.target.value);
    }

    const onSubmit = () => {
        setIsSearchInputActive(false);
        if (!enableTrasliteration) searchInputRef.current.blur();
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

    const handleTransliterationSwitchToggle = (e, checked) => {
        setEnableTrasliteration(checked);
        setText("");
    }

    const onReset = () => {
        setText("");
        setSelectedTargetLang("");
        setDomain("");
        setSelectedTransliterationLang("");
        // const apiObj = new searchGlossary("");
        // dispatch(APITransport(apiObj));
        setShowGlossaryResultTable(false);
        const apiObj = new searchGlossary("", selectedTargetLang, domain);
        dispatch(APITransport(apiObj));
    }

    const onDeleteGlossary = (success, message) => {
        setSnackbarInfo({
            open: true,
            message: message,
            variant: success ? "success" : "error"
        })

        if(success){
            setTimeout(() => {
                onSubmit();
            }, 2000);
        }
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
                hide={4000}
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
                marginTop={2}
            >
                {enableTrasliteration && <Grid item
                    sx={{ padding: 0, width: { xs: '100%', md: '20%' } }}
                >
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-helper-label" required>Source Language</InputLabel>
                        <Tooltip title={!selectedTransliterationLang ? "Please select a Source Language for transliteration. For English, please disable the Transliteration option" : ""} placement='left'>
                            
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={selectedTransliterationLang}
                                label="Source Language"
                                onChange={handleTransliterationLangChange}
                                sx={{
                                    textAlign: "left",
                                    backgroundColor: "#ffffff"
                                }}
                            >
                                {tansliterationLanguageList && tansliterationLanguageList.length > 0 && tansliterationLanguageList.map((el, i) => {
                                    return <MenuItem value={el.LangCode}>{el.DisplayName}</MenuItem>
                                })}
                            </Select>
                        </Tooltip>
                        
                        {!selectedTransliterationLang && <Typography variant='caption' sx={{ display: { md: "none", xs: "inline" } }}>
                            Please select a Source Language for transliteration. For English, please disable the Transliteration option
                        </Typography>}
                    </FormControl>
                </Grid>}
                <Grid item
                    sx={{ padding: 0, width: { xs: '100%', md: '20%' } }}
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
                    sx={{ padding: 0, width: { xs: '100%', md: enableTrasliteration ? '40%' : '60%' } }}
                >
                    <FormControl sx={{ width: '100%', textAlign: "center" }}>
                        {enableTrasliteration && selectedTransliterationLang ?
                            <IndicTransliterate
                                lang={selectedTransliterationLang}
                                value={text}
                                onChangeText={(val) => setText(val)}
                                renderComponent={(props) =>

                                    <input
                                        {...props}
                                        type='text'
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        placeholder="Search term..."
                                        style={{
                                            backgroundColor: "#ffffff",
                                            width: '100%',
                                            height: '3.7rem',
                                            // marginTop: 10,
                                            resize: 'none',
                                            borderRadius: 5,
                                            fontSize: '1.1rem',
                                            padding: 10,
                                            outline: 'none',
                                            border: '1px solid rgba(0,0,0,0.4)',
                                            '&::active': {
                                                border: '1px solid #2C2799'
                                            }
                                        }}
                                    />
                                }
                            />
                            : <OutlinedTextField
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                placeholder="Search term..."
                                onChange={handleTextChange}
                                onFocus={() => setIsSearchInputActive(true)}
                                onBlur={() => setIsSearchInputActive(false)}
                                inputRef={searchInputRef}
                                value={text}
                                fullWidth
                                sx={{
                                    backgroundColor: "#ffffff"
                                }}
                            />
                        }
                    </FormControl>

                </Grid>
                <Grid item
                    sx={{ padding: 0, width: { xs: '100%', md: '20%' } }}
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
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >

                <Grid item
                    sx={{ padding: 0, paddingRight: 2, marginTop: 1, width: '80%', textAlign: "end" }}
                >
                    <FormControlLabel
                        value={enableTrasliteration}
                        control={<Switch color="primary" checked={enableTrasliteration} />}
                        onChange={handleTransliterationSwitchToggle}
                        label={"Transliteration"}
                        labelPlacement="start"
                    />
                </Grid>

            </Grid>
            <Grid
                container
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                // sx={{ marginTop: showTableInside ? 0.5 : 0.5 }}
                spacing={2}
            >
                <Grid item
                    sx={{ padding: 0, width: { xs: '100%', md: (selectedTargetLang || domain || text || selectedTransliterationLang) ? '50%' : '100%' } }}
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
                    (selectedTargetLang || domain || text || selectedTransliterationLang) && <Grid item
                        sx={{ padding: 0, width: { xs: '100%', md: '50%' } }}
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
            {showTableInside && showGlossaryResultTable && glossaryData && glossaryData.length > 0 && <ViewGlossary glossaryData={glossaryData[0]?.glossaryPhrases} inputText={glossaryData[0]?.input} onDeleteGlossary={onDeleteGlossary} />}
            {renderSnackBar()}
        </div>

    )
}

export default SearchAndViewGlossary;