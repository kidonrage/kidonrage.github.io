import React from "react";
import { Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { ArrowForward, Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
import moment from "moment";
import Add from "@mui/icons-material/Add";
import libraryHelpers from '../libraryHelpers'


export const DocumentsList = ({ exam, documents, editExamType, openEditExamDialog, addDocument, editDocument, ...props }) => {

    const navigate = useNavigate();

    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
            {...props}
        >
            <Grid item><Typography sx={{ fontWeight: 700 }} variant="h5">{exam.title}</Typography></Grid>
            <Grid item>
                <Button
                    sx={{ minWidth: 36, minHeight: 36, p: 0 }}
                    variant="contained"
                    onClick={openEditExamDialog}>
                    <Edit fontSize="18" />
                </Button>
            </Grid>
            <Grid item><Button variant="contained" startIcon={<Add />} onClick={addDocument}>Add document</Button></Grid>
            <Grid item xs={12}>
                < TableContainer >
                    <Table sx={{ width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{ width: 224, color: '#8D8D8D' }}>
                                    Created
                                </TableCell>
                                <TableCell align="left" sx={{ color: '#8D8D8D' }}>
                                    Filename
                                </TableCell>
                                <TableCell align="left" sx={{ color: '#8D8D8D' }}>
                                    Document Type
                                </TableCell>
                                <TableCell align="right" sx={{ width: 240, color: '#8D8D8D' }} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documents.length > 0
                                ? documents.map((document) => (
                                    <TableRow
                                        hover
                                        onClick={(event) => {
                                            navigate(document.id)
                                        }}
                                        sx={{ cursor: 'pointer' }}
                                        key={document.id}
                                    >
                                        <TableCell align="left">{!!document.creationDate ? moment(new Date(document.creationDate * 1000)).format('MM/DD/YYYY') : '-'}</TableCell>
                                        <TableCell align="left">{document.title}</TableCell>
                                        <TableCell align="left">{libraryHelpers.documentTitles[document.type]}</TableCell>
                                        <TableCell align="right">
                                            <Button sx={{ minWidth: 36, minHeight: 36, p: 0 }} variant="contained" onClick={(e) => {
                                                e.stopPropagation()
                                                editDocument(document)
                                            }}><Edit fontSize="18" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : <TableRow>
                                    <TableCell align="center" colSpan={4}>You don't have any documents for this exam</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer >
            </Grid>
        </Grid>
    );
}