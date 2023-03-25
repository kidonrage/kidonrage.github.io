import React from "react";
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import { Box } from "@mui/system";
import moment from "moment";


export const DocumentsList = ({ documents = [], addDocument }) => {

    const navigate = useNavigate();

    return documents.length > 0
        ? (
            <TableContainer>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 224 }}>
                                Date
                            </TableCell>
                            <TableCell
                                align="left"
                            >
                                Exam Titile
                            </TableCell>
                            <TableCell align="right" sx={{ width: 240 }}>
                                <Button
                                    startIcon={<AddIcon />}
                                    variant="outlined"
                                    disableElevation
                                    onClick={addDocument}
                                >
                                    Add Document
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((document) => (
                            <TableRow
                                hover
                                onClick={(event) => {
                                    navigate(document.id)
                                }}
                                sx={{ cursor: 'pointer' }}
                                key={document.id}
                            >
                                <TableCell align="left">{!!document.examDate ? moment(new Date(document.examDate * 1000)).format('MM/DD/YYYY') : '-'}</TableCell>
                                <TableCell align="left">{document.title}</TableCell>
                                <TableCell align="right"><ArrowForward /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
        : (
            <Grid container direction="column" alignItems="center" rowGap={2} sx={{ p: 3 }}>
                <Typography variant="body">You don't have any documents in this group.</Typography>
                <Button
                    startIcon={<AddIcon />}
                    variant="outlined"
                    disableElevation
                    onClick={addDocument}
                >
                    Add Document
                </Button>
            </Grid>
        );
}