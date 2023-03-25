import React from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";


export const DocumentsList = ({ documents, addDocument }) => {

    const navigate = useNavigate();

    return (
        <TableContainer>
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Date
                        </TableCell>
                        <TableCell
                            align="left"
                        >
                            Exam Titile
                        </TableCell>
                        <TableCell align="right">
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
                            <TableCell align="left">{!!document.examDate ? document.examDate : '-'}</TableCell>
                            <TableCell align="left">{document.title}</TableCell>
                            <TableCell align="right"><ArrowForward /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}