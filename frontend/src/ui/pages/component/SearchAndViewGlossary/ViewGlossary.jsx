// ViewGlossary

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import glossaryLevel from '../../../../config/glossaryLevel';
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteGlossary from '../../../../redux/actions/api/DeleteGlossary/DeleteGlossary';

const cellHeaderPropStyle = {
    style: { justifyContent: 'center', textAlign: "left", padding: "16px" }
}

const cellPropStyle = {
    style: { justifyContent: 'center', textAlign: "left" }
}

const ViewGlossary = (props) => {

    const { glossaryData, inputText, publicLayout, onDeleteGlossary } = props;

    const [deleteObj, setDeleteObj] = useState();
    const [showDeleteConfirmBox, setShowDeleteConfirmBox] = useState(false);

    console.log("glossaryData --- ", glossaryData);

    const deleteGlossary = (gloss_hash) => {
        let apiObj = new DeleteGlossary(gloss_hash);
        fetch(apiObj.apiEndPoint(), {
            method: "POST",
            headers: apiObj.getHeaders().headers,
            body: JSON.stringify(apiObj.getBody())
        })
            .then(res => res.json())
            .then(response => {
                onDeleteGlossary(true, response.message);
                closeConfirmDeleteDialogue()
            })
            .catch(err => {
                onDeleteGlossary(false, "Glossary deletion failed.");
                closeConfirmDeleteDialogue()
            })
    }

    const closeConfirmDeleteDialogue = () => {
        setShowDeleteConfirmBox(false);
        setDeleteObj();
    }

    const renderConfirmDeleteDialogue = () => {
        return (
            <Dialog
                open={showDeleteConfirmBox}
                onClose={closeConfirmDeleteDialogue}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {deleteObj?.srcText} : {deleteObj?.tgtText}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to delete this glossary?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmDeleteDialogue}>Cancel</Button>
                    <Button onClick={() => deleteGlossary(deleteObj?.hash)} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const options = {
        textLabels: {
            body: {
                noMatch: "No records",
            },
            toolbar: {
                search: "Search",
                viewColumns: "View Column",
            },
            pagination: { rowsPerPage: "Rows per page" },
            options: { sortDirection: "desc" },
        },
        // customToolbar: fetchHeaderButton,
        displaySelectToolbar: false,
        fixedHeader: false,
        filterType: "checkbox",
        download: true,
        print: true,
        rowsPerPageOptions: [10, 25, 50, 100],
        // rowsPerPage: PageInfo.count,
        filter: false,
        // page: PageInfo.page,
        viewColumns: true,
        selectableRows: "none",
        search: true,
        jumpToPage: true,
    };

    const columns = [
        {
            name: "srcText",
            label: "Source Text",
            options: {
                filter: false,
                sort: false,
                align: "left",
                setCellHeaderProps: () => (cellHeaderPropStyle),
                setCellProps: () => (cellPropStyle)
            }
        },
        {
            name: "tgtText",
            label: "Target Text",
            options: {
                filter: false,
                sort: false,
                align: "left",
                setCellHeaderProps: () => (cellHeaderPropStyle),
                setCellProps: () => (cellPropStyle)
            }
        },
        // {
        //     name: "srcLanguage",
        //     label: "Source Language",
        //     options: {
        //         filter: false,
        //         sort: false,
        //         align : "center",
        //         setCellHeaderProps: () => (cellHeaderPropStyle),
        //         setCellProps: () => (cellPropStyle)
        //     }
        // },
        // {
        //     name: "tgtLanguage",
        //     label: "Target Language",
        //     options: {
        //         filter: false,
        //         sort: false,
        //         align : "center",
        //         setCellHeaderProps: () => (cellHeaderPropStyle),
        //         setCellProps: () => (cellPropStyle)
        //     }
        // },
        {
            name: "domain",
            label: "Domain",
            options: {
                filter: false,
                sort: false,
                align: "center",
                setCellHeaderProps: () => (cellHeaderPropStyle),
                setCellProps: () => (cellPropStyle)
            }
        },
        {
            name: "collectionSource",
            label: "Collection Source",
            options: {
                filter: false,
                sort: false,
                align: "center",
                setCellHeaderProps: () => (cellHeaderPropStyle),
                setCellProps: () => (cellPropStyle)
            }
        },
        {
            name: "level_code",
            label: "Level Code",
            options: {
                filter: false,
                sort: false,
                align: "center",
                display: 'none',
                setCellHeaderProps: () => (cellHeaderPropStyle),
                setCellProps: () => (cellPropStyle)
            }
        },
        {
            name: "level",
            label: "Level",
            options: {
                filter: false,
                sort: false,
                align: "center",
                setCellHeaderProps: () => (cellHeaderPropStyle),
                setCellProps: () => (cellPropStyle)
            }
        },
        {
            name: "Action",
            label: "Actions",
            options: {
                filter: false,
                sort: false,
                align: "center",
                display: publicLayout ? "excluded" : true,
                setCellHeaderProps: () => (cellHeaderPropStyle),
                setCellProps: () => (cellPropStyle),
                //   customBodyRender: (value, tableMeta) => {
                //     console.log("tableMeta ------ ", tableMeta);
                //     return (
                //       <Box sx={{ display: "flex" }}>
                //           <Button>Action</Button>
                //       </Box>
                //     );
                //   },
            },
        },
    ];

    const tableData = glossaryData && glossaryData.length > 0 ? glossaryData.map((el, i) => {
        return [
            el.srcText,
            el.tgtText,
            el.domain,
            el.collectionSource,
            el.level,
            glossaryLevel.filter((level) => level.key == el.level)[0].name,
            <Box sx={{ display: "flex" }}>
                <Tooltip title="Delete">
                    <IconButton
                        onClick={() => {
                            setDeleteObj(el);
                            setShowDeleteConfirmBox(true)
                            // deleteGlossary(el?.hash)
                        }}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

            </Box>
        ]
    }) : []

    return (
        <Grid
            sx={{
                marginTop: publicLayout ? 2 : 10
            }}
        >
            <MUIDataTable
                data={tableData}
                columns={columns}
                options={options}
            />
            {renderConfirmDeleteDialogue()}
        </Grid>
    )
}

export default ViewGlossary;