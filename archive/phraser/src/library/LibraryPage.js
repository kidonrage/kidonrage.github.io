import React, { useEffect } from "react";

import { Grid, Box, Container, Button, TextField, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit"
import { DocumentsList } from "./components/DocumentsList";
import { guidGenerator } from "../utils";
import { NewDocumentDialog } from "./components/NewDocumentDialog";
import { addDocument, fetchDocuments, fetchSubjects, updateSubject as editSubject } from "../utils/libraryRepository";
import { NewExamTypeDialog } from "../dialogs/NewExamTypeDialog";
import { addExam } from "../utils/libraryRepository";
import { fetchExamsForSubjectWithId } from "../utils/libraryRepository";
import { fetchDocumentsForExamsWithIDs } from "../utils/libraryRepository";
import { EditSubjectDialog } from "./components/EditSubjectDialog";
import { EditExamTypeDialog } from "./components/EditExamTypeDialog";
import { updateExam } from "../utils/libraryRepository";
import { EditDocumentDialog } from "./components/EditDocumentDialog";
import { updateDocument } from "../utils/libraryRepository";
import { useDispatch, useSelector } from "react-redux";
import { set, addSubject, updateSubject } from "../store/subjectsSlice";
import { open as openAddSubjectDialog } from "../store/addSubjectDialogSlice";
import { open as openNewExamDialog } from "../store/newExamTypeDialogSlice";

export const LibraryPage = ({ setError }) => {

    const addSubjectTabValue = 'add'

    const [selectedSubjectId, setSelectedSubjectId] = React.useState('')
    const [selectedSubjectExams, setSelectedSubjectExams] = React.useState([])

    const [examsDocuments, setExamsDocuments] = React.useState({})

    const [editExamTypeDialogOpen, setEditExamTypeDialogOpen] = React.useState(false)
    const [editingExam, setEditingExam] = React.useState(undefined)

    const [editSubjectDialogOpen, setEditSubjectDialogOpen] = React.useState(false)
    const [editingSubject, setEditingSubject] = React.useState(undefined)

    const [editDocumentDialogOpen, setEditDocumentDialogOpen] = React.useState(false)
    const [editingDocument, setEditingDocument] = React.useState(undefined)

    const [newDocumentDialogOpen, setNewDocumentDialogOpen] = React.useState(false)

    const subjects = useSelector((state) => state.subjects.list)
    const dispatch = useDispatch()

    useEffect(() => {
        if (subjects.length > 0) {
            setSelectedSubjectId(subjects[0].id)
        }
    }, [])

    useEffect(() => {
        if (!!!selectedSubjectId) { return }
        async function fetchSubject() {
            const subject = await fetchExamsForSubjectWithId(selectedSubjectId)
            setSelectedSubjectExams(subject)
        }
        fetchSubject()
    }, [selectedSubjectId])

    useEffect(() => {
        async function fetchDocs() {
            const fetchedExamsDocuments = await fetchDocumentsForExamsWithIDs(selectedSubjectExams.map((exam) => exam.id))
            setExamsDocuments(fetchedExamsDocuments)
        }
        fetchDocs()
    }, [selectedSubjectExams])

    const handleSelectSubjectTab = (event, selectedSubjectId) => {
        if (selectedSubjectId === addSubjectTabValue) {
            dispatch(openAddSubjectDialog({
                newSubjectAddedHandler: (newSubject) => {
                    setSelectedSubjectId(newSubject.id)
                }
            }))
        } else {
            setSelectedSubjectId(selectedSubjectId)
        }
    }

    const handleSaveEditingExam = (exam) => {
        updateExam(exam)
            .then((updatedExam) => {
                let updatedExams = [...selectedSubjectExams]
                const updatedSubjectIndex = updatedExams.findIndex(exam => exam.id === updatedExam.id)
                updatedExams[updatedSubjectIndex] = updatedExam
                setSelectedSubjectExams(updatedExams)
            })
            .catch((error) => setError(error))

    }

    const handleAddExamTypeButtonClicked = () => {
        if (!!!selectedSubjectId) { return }

        dispatch(openNewExamDialog({
            subjectId: selectedSubjectId,
            newExamAddedHandler: (newExam) => {
                setSelectedSubjectExams([
                    ...selectedSubjectExams,
                    newExam
                ])
            }
        }))
    }

    const handleCreateNewDocument = (title, examId, type) => {
        addDocument(title, examId, type)
            .then((createdDoc) => {
                let updatedExamsDocuments = examsDocuments
                updatedExamsDocuments = {
                    ...updatedExamsDocuments,
                    [examId]: [
                        ...updatedExamsDocuments[examId] || [],
                        createdDoc
                    ]
                }
                setExamsDocuments(updatedExamsDocuments)
            })
            .catch((error) => setError(error))
    }

    const handleSaveEditedSubject = (subject) => {
        editSubject(subject)
            .then((updatedSubject) => {
                dispatch(updateSubject(updatedSubject))
            })
            .catch((error) => setError(error))
    }

    const handleSaveEditedDocument = (document) => {
        updateDocument(document)
            .then((updatedDoc) => {
                let updatedExamsDocuments = { ...examsDocuments }

                let parentExamDocuments = [...updatedExamsDocuments[updatedDoc.examId]]

                let documentIndex = parentExamDocuments.findIndex(doc => doc.id === updatedDoc.id)
                parentExamDocuments[documentIndex] = updatedDoc

                updatedExamsDocuments[updatedDoc.examId] = parentExamDocuments

                setExamsDocuments(updatedExamsDocuments)
            })
            .catch((error) => setError(error))
    }

    const handleCloseEditSubjectDialog = () => {
        setEditSubjectDialogOpen(false)
    }

    const handleCloseEditExamTypeDialog = () => {
        setEditExamTypeDialogOpen(false)
    }

    const handleCloseEditDocumentDialog = () => {
        setEditDocumentDialogOpen(false)
    }

    const handleCloseNewDocumentDialog = () => {
        setNewDocumentDialogOpen(false)
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

                {!!subjects && (
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        sx={{ mb: 4 }}
                    >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '100%' }}>
                            <Tabs value={selectedSubjectId || ''} onChange={handleSelectSubjectTab} scrollButtons="auto" variant="scrollable">
                                {subjects.map((subject) => (
                                    <Tab
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                                                <Typography sx={{ pr: 1 }}>{subject.title}</Typography>
                                                <IconButton
                                                    aria-label="delete"
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setEditingSubject(subject)
                                                        setEditSubjectDialogOpen(true)
                                                    }}
                                                >
                                                    <Edit fontSize="inherit" />
                                                </IconButton>
                                            </Box>
                                        }
                                        value={subject.id}
                                        key={subject.id}
                                        sx={{ p: 0 }}
                                    />
                                ))}
                                <Tab icon={<Add />} iconPosition="start" label="Add subject" value={addSubjectTabValue} />
                            </Tabs>
                        </Box>
                    </Grid>
                )}

                {!!selectedSubjectExams && (
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        spacing={4}
                    >
                        {selectedSubjectExams.map((exam) => (
                            <Grid
                                key={exam.id}
                                item
                                xs={12}
                                justifyContent="start"
                            >
                                <DocumentsList
                                    exam={exam}
                                    documents={examsDocuments[exam.id] || []}
                                    addDocument={() => setNewDocumentDialogOpen(true)}
                                    openEditExamDialog={() => {
                                        setEditingExam(exam)
                                        setEditExamTypeDialogOpen(true)
                                    }}
                                    editDocument={(document) => {
                                        setEditingDocument(document)
                                        setEditDocumentDialogOpen(true)
                                    }}
                                />
                            </Grid>
                        ))}
                        {!!selectedSubjectId && (
                            <Grid
                                item
                                xs={12}
                                justifyContent="start"
                            >
                                <Button
                                    startIcon={<Add />}
                                    onClick={handleAddExamTypeButtonClicked}
                                >
                                    Add exam type
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                )}

            </Container>

            <EditSubjectDialog
                open={editSubjectDialogOpen}
                onClose={handleCloseEditSubjectDialog}
                handleSaveSubject={handleSaveEditedSubject}
                editingSubject={editingSubject}
                fullWidth={true}
                maxWidth={'sm'}
            />

            <NewDocumentDialog
                open={newDocumentDialogOpen}
                onClose={handleCloseNewDocumentDialog}
                selectedSubject={selectedSubjectId}
                handleSaveNewDocument={handleCreateNewDocument}
                fullWidth={true}
                maxWidth={'lg'}
            />
            <EditDocumentDialog
                open={editDocumentDialogOpen}
                onClose={handleCloseEditDocumentDialog}
                handleSaveDocument={handleSaveEditedDocument}
                editingDocument={editingDocument}
                fullWidth={true}
                maxWidth={'sm'}
            />

            <EditExamTypeDialog
                open={editExamTypeDialogOpen}
                onClose={handleCloseEditExamTypeDialog}
                handleSaveExam={handleSaveEditingExam}
                editingExam={editingExam}
                fullWidth={true}
                maxWidth={'sm'}
            />
        </Box >
    )
}