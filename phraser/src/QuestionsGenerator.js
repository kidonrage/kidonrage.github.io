import React from "react";
import copy from 'clipboard-copy'
import { Grid, Box, Container, Button, Typography, Input, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Save as SaveIcon } from "@mui/icons-material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { generateQuestions } from "./utils";

export const QuestionsGenerator = (props) => {

    const [contextString, setContextString] = React.useState('');
    const [generatedQuestionsString, setGeneratedQuestionsString] = React.useState('');
    const [questionsCount, setGeneratedQuestionsCount] = React.useState(10);

    const [questionType, setQuestionType] = React.useState('');

    const copyAllTexts = () => {
        const stringToCopy = generatedQuestionsString
        if (!stringToCopy) { return }
        copy(stringToCopy)
    }

    const handleQuestionTypeChanged = (e) => {
        setQuestionType(e.target.value)
    }

    const handleChangeQuestionsCount = (e) => {
        setGeneratedQuestionsCount(e.target.value)
    }

    const handleContextInput = (event) => {
        setContextString(event.target.value)
    }

    const handleGenerateQuestions = () => {
        console.log(contextString)
        generateQuestions(contextString, questionsCount, questionType)
            .then((result) => {
                setGeneratedQuestionsString(result)
            })
            .catch((error) => {
                // setError(error.message)
            })
            .finally(() => {
                // setIs
            })
    }

    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );

    const questionsCountOptions = arrayRange(1, 20, 1)

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
                    <Grid item xs={6}>
                        <Typography
                            component="h5"
                            variant="h5"
                            color="text.primary"
                        >
                            Context
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            component="h5"
                            variant="h5"
                            color="text.primary"
                        >
                            Generated Questions
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
                                <Grid item xs={12} md={6}>
                                    <FormControl size="small" sx={{ minWidth: 160, mr: 1.5 }}>
                                        <InputLabel id="question-type-select-label">Question type</InputLabel>
                                        <Select
                                            labelId="question-type-select-label"
                                            id="question-type-select"
                                            value={questionType}
                                            label="Question type"
                                            onChange={handleQuestionTypeChanged}
                                        >
                                            <MenuItem value={'Multiple choice'}>Multiple choice</MenuItem>
                                            <MenuItem value={'True/False'}>True/False</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl size="small" sx={{ minWidth: 80, mr: 1.5 }}>
                                        <InputLabel id="questions-count-select-label">Questions</InputLabel>
                                        <Select
                                            labelId="questions-count-select-label"
                                            id="questions-count-select"
                                            value={questionsCount}
                                            label="Questions"
                                            onChange={handleChangeQuestionsCount}
                                        >
                                            {questionsCountOptions.map(option => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <Button
                                        sx={{ mr: 1 }}
                                        onClick={handleGenerateQuestions}
                                        variant="contained"
                                    >
                                        Generate questions
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6} alignItems="stretch">
                                    <Button
                                        sx={{ mr: 1 }}
                                        onClick={copyAllTexts}
                                        variant="outlined"
                                        startIcon={<ContentCopyIcon />}
                                    >
                                        Copy text
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6} alignItems="stretch">
                                    <TextField
                                        label="Context"
                                        multiline
                                        rows={4}
                                        value={contextString}
                                        fullWidth
                                        onChange={event => { handleContextInput(event) }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Generated questions"
                                        multiline
                                        rows={4}
                                        value={generatedQuestionsString}
                                        fullWidth
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