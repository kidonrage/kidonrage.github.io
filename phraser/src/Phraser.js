import React from "react";

import { Grid, Box, Container, Button, Typography, Switch, Paper, TextField, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';


import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddIcon from '@mui/icons-material/Add';

import { paraphrase } from './utils';
import copy from 'clipboard-copy'

class QuestionModel {

    constructor(original, rephrased, isParaphrasing, isFixed) {
        this.original = original
        this.rephrased = rephrased
        this.isParaphrasing = isParaphrasing
        this.isFixed = isFixed
    }
}

export const Phraser = ({ setError }) => {

    const [rephrasingQuestionsIndicies, setRephrasingQuestionsIndicies] = React.useState([])
    const [questions, setQuestions] = React.useState([
        new QuestionModel('How old are you?', '', false, false)
    ]);

    const handleOriginalQuestionInput = (questionIndex, event) => {
        var updatedQuestions = [...questions]
        updatedQuestions[questionIndex].original = event.target.value
        setQuestions(updatedQuestions)
    }

    const handleToggleFixQuestion = (questionIndex) => {
        var updatedQuestions = [...questions]
        updatedQuestions[questionIndex].isFixed = !updatedQuestions[questionIndex].isFixed
        setQuestions(updatedQuestions)
    }

    const addQuestion = () => {
        setQuestions([
            ...questions,
            new QuestionModel('', '', false, false)
        ])
    }

    const paraphraseQuestion = (questionIndex) => {
        setRephrasingQuestionsIndicies([...rephrasingQuestionsIndicies, questionIndex])
        let question = questions[questionIndex]
        if (!question.original) { return }
        paraphrase(question.original)
            .then((result) => {
                var updatedQuestions = [...questions]
                updatedQuestions[questionIndex].rephrased = result
                setQuestions(updatedQuestions)
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
            (acc, question, index) => acc + question.rephrased + (index < questions.length - 1 ? "\n\n" : ""),
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

                    {questions.map((question, index) => {
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
                                                value={question.original}
                                                fullWidth
                                                onChange={event => { handleOriginalQuestionInput(index, event) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Rephrased question"
                                                multiline
                                                rows={4}
                                                value={question.rephrased}
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
                                                disabled={!question.original || question.isFixed}
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
                                                disabled={!question.rephrased}
                                                onClick={() => {
                                                    copy(question.rephrased)
                                                }}
                                                sx={{
                                                    mr: 2
                                                }}
                                            >
                                                Copy text
                                            </Button>
                                            {question.rephrased && (
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            value={question.isFixed}
                                                            checked={question.isFixed}
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