import React from "react";
import copy from 'clipboard-copy'
import { Grid, Box, Container, Button, Typography, Paper, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { fetchQuestionGeneratorDocumentData } from "../utils/libraryRepository";
import { useParams } from "react-router-dom";

export const QuestionGeneratorDocumentPage = ({ setError }) => {

    const [documentTitle, setDocumentTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    let { documentId } = useParams();

    React.useEffect(() => {
        async function initialFetch() {
            const documentData = await fetchQuestionGeneratorDocumentData(documentId)
            console.log(documentData)
            setDocumentTitle(documentData.title)
            setContent(documentData.content)
        }
        initialFetch()
    }, [])

    const copyAllTexts = () => {
        const stringToCopy = content
        if (!stringToCopy) { return }
        copy(stringToCopy)
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 6,
                pb: 6,
            }}
        >
            <Container>
                <Grid container rowSpacing={3} columnSpacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            component="h5"
                            variant="h5"
                            color="text.primary"
                        >
                            {documentTitle}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                            }}
                        >
                            <Grid container rowSpacing={1.5} columnSpacing={{ xs: 3 }}>
                                <Grid item xs={12} md={6} alignItems="stretch">
                                    <Button
                                        sx={{ mr: 1 }}
                                        onClick={copyAllTexts}
                                        variant="outlined"
                                        startIcon={<ContentCopyIcon />}
                                        disabled={!!!content}
                                    >
                                        Copy text
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Generated questions"
                                        multiline
                                        minRows={4}
                                        value={content}
                                        fullWidth
                                        maxRows={24}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </Box>
    )
}