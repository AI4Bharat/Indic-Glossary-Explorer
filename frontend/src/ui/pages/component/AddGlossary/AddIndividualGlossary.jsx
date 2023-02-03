// AddIndividualGlossary

import { Translate } from '@material-ui/icons';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomButton from '../../component/common/Button';
import CustomizedSnackbars from "../../component/common/Snackbar";
import OutlinedTextField from '../../component/common/OutlinedTextField';
import { translate } from '../../../../config/localisation';
import getLanguages from '../../../../redux/actions/api/getLanguages/getLanguages';
import { useDispatch, useSelector } from 'react-redux';
import APITransport from "../../../../redux/actions/apitransport/apitransport";
import getDomains from '../../../../redux/actions/api/getDomains/getDomains';
import glossaryLevel from '../../../../config/glossaryLevel';
import addGlossary from '../../../../redux/actions/api/uploadGlossary/addGlossary';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddIndividualGlossary = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allLevels = glossaryLevel;

    const [selectedSourceLang, setSelectedSourceLang] = useState('');
    const [selectedTargetLang, setSelectedTargetLang] = useState('');
    const [SourceText, setSourceText] = useState('');
    const [targetText, settargetText] = useState('');
    const [domain, setDomain] = useState('');
    const [collectionSource, setCollectionSource] = useState('');
    const [level, setLevel] = useState('');

    const [sourceLangOptions, setSourceLangOptions] = useState(null);
    const [targLangOptions, setTargLangOptions] = useState(null);

    const [snackbar, setSnackbarInfo] = useState({
        open: false,
        message: "",
        variant: "success",
    });

    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    }

    const handleDomainChange = (event) => {
        setDomain(event.target.value)
    }

    const handleSrcLangChange = (event) => {
        setSelectedSourceLang(event.target.value);
    }

    const handleTrgLangChange = (event) => {
        setSelectedTargetLang(event.target.value);
    }

    const handleSourceTextChange = (event) => {
        setSourceText(event.target.value)
    }
    const handleTargetTextChange = (event) => {
        settargetText(event.target.value)
    }
    const handleCollectionSourceTextChange = (event) => {
        setCollectionSource(event.target.value)
    }

    useEffect(() => {
        if (selectedSourceLang) {
            const targLanguages = allLanguages.filter((el, i) => el?.code !== selectedSourceLang);
            setTargLangOptions(targLanguages)
        }

    }, [selectedSourceLang])


    const allLanguages = useSelector((state) => state.getAllLanguages);
    const allDomains = useSelector((state) => state.getAllDomains);

    // const createGlossaryStatus = useSelector((state) => state.addGlossary);
    // const apiStatus = useSelector((state) => state.apiStatus);

    useEffect(() => {
        const langApiObj = new getLanguages();
        dispatch(APITransport(langApiObj));

        const domainApiObj = new getDomains();
        dispatch(APITransport(domainApiObj));

    }, []);

    useEffect(() => {
        if (allLanguages) {
            setSourceLangOptions(allLanguages);
        }
    }, [allLanguages])

    const onSubmit = () => {
        const apiObj = new addGlossary(selectedSourceLang, selectedTargetLang, SourceText, targetText, domain, collectionSource, level);
        axios.post(apiObj.endpoint, apiObj.getBody(), apiObj.getHeaders())
            .then(response => {
                console.log("response --- ", response);
                if (response.status == 200) {
                    setSnackbarInfo({
                        open: true,
                        message: response.data.message,
                        variant: "success",
                    });
                    navigate("/view-glossary");
                }
            }).catch(err => {
                console.log("err -- ", err);
                setSnackbarInfo({
                    open: true,
                    message: err.response.data.message,
                    variant: "error",
                })
            })
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
        <Grid>
            <Grid
                container
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <FormControl sx={{ m: 1, minWidth: {md:500, xs: "100%"} }}>
                    <InputLabel id="demo-simple-select-helper-label">Source Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedSourceLang}
                        label="Source Language"
                        onChange={handleSrcLangChange}
                        sx={{
                            textAlign: "left"
                        }}
                    >
                        {sourceLangOptions && sourceLangOptions.length > 0 && sourceLangOptions.map((el, i) => {
                            return <MenuItem value={el.code}>{el.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: {md:500, xs: "100%"} }}>
                    <InputLabel id="demo-simple-select-helper-label">Target Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedTargetLang}
                        label="Target Language"
                        onChange={handleTrgLangChange}
                        sx={{
                            textAlign: "left"
                        }}
                    >
                        {targLangOptions && targLangOptions.length > 0 && targLangOptions.map((el, i) => {
                            return <MenuItem value={el.code}>{el.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid
                container
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{
                    marginTop: {md:4, xs: 2}
                }}
            >

                <OutlinedTextField
                    placeholder="Source Text"
                    sx={{ width: {md:500, xs: "100%"}, marginBottom: {md:0, xs: 3} }}
                    value={SourceText}
                    onChange={handleSourceTextChange}
                />
                <OutlinedTextField
                    placeholder="Target Text"
                    sx={{ width: {md:500, xs: "100%"}}}
                    value={targetText}
                    onChange={handleTargetTextChange}
                />
            </Grid>
            <Grid
                container
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{
                    marginTop: {md:4, xs: 2}
                }}
            >
                <FormControl sx={{ m: 1, minWidth: {md:500, xs: "100%"} }}>
                    <InputLabel id="demo-simple-select-helper-label">Domain</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={domain}
                        label="Domain"
                        onChange={handleDomainChange}
                        sx={{
                            textAlign: "left"
                        }}
                    >
                        {allDomains && allDomains.length > 0 && allDomains.map((el, i) => {
                            return <MenuItem value={el.code}>{el.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: {md:500, xs: "100%"} }}>
                    <InputLabel id="demo-simple-select-helper-label">Level</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={level}
                        label="Level"
                        onChange={handleLevelChange}
                        sx={{
                            textAlign: "left"
                        }}
                    >
                        {
                            allLevels.map((el, i) => {
                                return <MenuItem value={el.key}>{el.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid
                container
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{
                    marginTop: {md:4, xs: 2},
                    marginBottom: 4
                    // alignItems: "center"
                }}
            >
                <OutlinedTextField
                    placeholder="Collection Source"
                    sx={{ width: {md:500, xs: "100%"}, marginBottom: {md:0, xs: 3} }}
                    value={collectionSource}
                    onChange={handleCollectionSourceTextChange}
                />
                <CustomButton
                    label={translate("button.submit")}
                    onClick={onSubmit}
                    sx={{
                        width: {md:500, xs: "100%"},
                        padding: 4,
                        borderRadius: 2,
                    }}
                />
            </Grid>
            {renderSnackBar()}
        </Grid>
    )
}

export default AddIndividualGlossary;