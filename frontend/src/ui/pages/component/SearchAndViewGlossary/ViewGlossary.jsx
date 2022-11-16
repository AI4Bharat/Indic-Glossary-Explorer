// ViewGlossary

import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import glossaryLevel from '../../../../config/glossaryLevel';

const cellHeaderPropStyle = {
    style: {justifyContent: 'center', textAlign: "left", padding: "16px" }
}

const cellPropStyle = {
    style: {justifyContent: 'center', textAlign: "left" }
}

const ViewGlossary = (props) => {

    const { glossaryData, inputText, publicLayout } = props;

    console.log("glossaryData --- ", glossaryData);

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
                align : "left",
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
                align : "left",
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
                align : "center",
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
                align : "center",
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
                align : "center",
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
                align : "center",
                setCellHeaderProps: () => (cellHeaderPropStyle),
                setCellProps: () => (cellPropStyle)
            }
        },
        // {
        //     name: "Actions",
        //     label: "Actions",
        //     options: {
        //         filter: false,
        //         sort: false,
        //     }
        // }
    ];

    const tableData = glossaryData && glossaryData.length > 0 ? glossaryData.map((el,i)=>{
        return [
            el.srcText,
            el.tgtText,
            // el.srcLanguage,
            // el.tgtLanguage,
            el.domain,
            el.collectionSource,
            el.level,
            glossaryLevel.filter((level)=>level.key == el.level)[0].name
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
        </Grid>
    )
}

export default ViewGlossary;