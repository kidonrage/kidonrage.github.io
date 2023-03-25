import React from "react";

import { Grid, Box, Container, Button, Typography, Switch, Paper, TextField, FormControlLabel, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Breadcrumbs } from '@mui/material';
import { LoadingButton } from '@mui/lab';


import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddIcon from '@mui/icons-material/Add';

import { paraphrase } from '../../utils';
import copy from 'clipboard-copy'
import { Link, useParams } from "react-router-dom";
import { fetchQuestions, setDocumentQuestions } from "../utils/libraryRepository";

class QuestionModel {

    constructor(original, rephrased, isFixed) {
        this.original = original
        this.rephrased = rephrased
        this.isFixed = isFixed
    }
}

class QuestionViewModel {

    constructor(question, isParaphrasing = false) {
        this.question = question
        this.isParaphrasing = isParaphrasing
    }
}

export const DocumentPage = ({ setError }) => {

    const [rephrasingQuestionsIndicies, setRephrasingQuestionsIndicies] = React.useState([])
    const [questions, setQuestions] = React.useState([]);

    let { documentId } = useParams();

    React.useEffect(() => {
        fetchQuestions(documentId)
            .then((result) => {
                setQuestions(result.map(question => new QuestionViewModel(question, false)))
            })
            .catch(error => setError(error))
    }, [])

    const handleOriginalQuestionInput = (questionIndex, event) => {
        var updatedQuestions = [...questions]
        updatedQuestions[questionIndex].question.original = event.target.value
        setQuestions(updatedQuestions)
    }

    const handleToggleFixQuestion = (questionIndex) => {
        var updatedQuestions = [...questions]
        updatedQuestions[questionIndex].question.isFixed = !updatedQuestions[questionIndex].question.isFixed
        setQuestions(updatedQuestions)
        setDocumentQuestions(updatedQuestions.map((questionViewModel) => questionViewModel.question), documentId)
    }

    const addQuestion = () => {
        setQuestions([
            ...questions,
            new QuestionViewModel(new QuestionModel('', '', false, false), false)
        ])
    }

    const paraphraseQuestion = (questionIndex) => {
        setRephrasingQuestionsIndicies([...rephrasingQuestionsIndicies, questionIndex])
        let question = questions[questionIndex].question
        if (!question.original) { return }
        paraphrase(question.original)
            .then((result) => {
                var updatedQuestions = [...questions]
                updatedQuestions[questionIndex].question.rephrased = result
                setQuestions(updatedQuestions)
                setDocumentQuestions(updatedQuestions.map((questionViewModel) => questionViewModel.question), documentId)
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setRephrasingQuestionsIndicies(rephrasingQuestionsIndicies.filter(index => index != questionIndex))
            })
    }

    const copyAllTexts = () => {
        const stringToCopy = questions.reduce(
            (acc, question, index) => acc + question.question.rephrased + (index < questions.length - 1 ? "\n\n" : ""),
            ""
        )
        console.log(stringToCopy)
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
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ pb: 4 }}
                >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="phraser">
                            Phraser library
                        </Link>
                        <Typography color="text.primary">Document</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ pb: 4 }}
                >
                    <Grid item xs="auto">
                        <Button
                            startIcon={<AddIcon />}
                            variant="outlined"
                            disableElevation
                            onClick={addQuestion}
                        >
                            Add Question
                        </Button>
                    </Grid>
                    <Grid item xs="auto">
                        <Button
                            sx={{ mr: 1 }}
                            startIcon={<ContentCopyIcon />}
                            variant="outlined"
                            onClick={copyAllTexts}
                        >
                            Copy all texts
                        </Button>
                        {/* <Button startIcon={<SaveIcon />} variant="outlined">Save</Button> */}
                    </Grid>
                </Grid>

                <Grid container rowSpacing={3} columnSpacing={2}>
                    <Grid item xs={6}>
                        <Typography
                            component="h5"
                            variant="h5"
                            color="text.primary"
                        >
                            <strong>Original</strong> Question
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            component="h5"
                            variant="h5"
                            color="text.primary"
                        >
                            <strong>Paraphrased</strong> Question
                        </Typography>
                    </Grid>

                    {questions.map((questionViewModel, index) => {
                        return (
                            <Grid key={index} item xs={12}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 3 }}>
                                        <Grid item xs={12} md={6} alignItems="stretch">
                                            <TextField
                                                label="Original Question"
                                                multiline
                                                rows={4}
                                                value={questionViewModel.question.original}
                                                fullWidth
                                                onChange={event => { handleOriginalQuestionInput(index, event) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Rephrased question"
                                                multiline
                                                rows={4}
                                                value={questionViewModel.question.rephrased}
                                                fullWidth
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <LoadingButton
                                                variant="contained"
                                                loading={rephrasingQuestionsIndicies.includes(index)}
                                                disabled={!questionViewModel.question.original || questionViewModel.question.isFixed}
                                                loadingPosition="start"
                                                startIcon={<CachedIcon />}
                                                onClick={() => paraphraseQuestion(index)}
                                            >
                                                Paraphrase
                                            </LoadingButton>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button
                                                variant="outlined"
                                                startIcon={<ContentCopyIcon />}
                                                disableElevation
                                                disabled={!questionViewModel.question.rephrased}
                                                onClick={() => {
                                                    copy(questionViewModel.question.rephrased)
                                                }}
                                                sx={{
                                                    mr: 2
                                                }}
                                            >
                                                Copy text
                                            </Button>
                                            {questionViewModel.question.rephrased && (
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            value={questionViewModel.question.isFixed}
                                                            checked={questionViewModel.question.isFixed}
                                                            onChange={() => { handleToggleFixQuestion(index) }}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    }
                                                    label="Fix variant"
                                                />
                                            )}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                    })
                    }

                </Grid>
            </Container>
        </Box>
    )
}