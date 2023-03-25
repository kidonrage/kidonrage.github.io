import React, { useEffect } from "react";

import { Grid, Box, Container, Button, TextField, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Add from "@mui/icons-material/Add";
import { DocumentsList } from "./components/DocumentsList";
import { guidGenerator } from "../../utils";
import { NewDocumentDialog } from "./components/NewDocumentDialog";
import { NewGroupDialog } from "./components/NewGroupDialog";
import { addDocument, addGroup, fetchDocuments, fetchGroups } from "../utils/libraryRepository";

class DocumentModel {

    constructor(title, groupId, examDate) {
        this.id = guidGenerator()
        this.title = title
        this.group = groupId
        this.examDate = examDate
    }
}

class GroupModel {

    constructor(title) {
        this.id = guidGenerator()
        this.title = title
    }
}

export const LibraryPage = ({ setError }) => {

    const [groups, setGroups] = React.useState([])
    const addGroupTabValue = 'add'

    const [selectedTab, setSelectedTab] = React.useState('')
    const [currentGroupDocuments, setCurrentGroupDocuments] = React.useState([])

    const [newGroupDialogOpen, setNewGroupDialogOpen] = React.useState(false)
    const [newDocumentDialogOpen, setNewDocumentDialogOpen] = React.useState(false)

    useEffect(() => {
        fetchGroups()
            .then(initialGroups => {
                setGroups(initialGroups)
                if (initialGroups.length > 0) {
                    setSelectedTab(initialGroups[0].id)
                }
            })
            .catch(error => setError(error))
    }, [])

    useEffect(() => {
        let selectedGroupIndex = groups.findIndex(group => group.id == selectedTab)
        if (selectedGroupIndex == -1) { return }

        let groupName = groups[selectedGroupIndex].title

        fetchDocuments(selectedTab)
            .then((groupDocuments) => {
                setCurrentGroupDocuments(groupDocuments)
            })
            .catch(error => setError(error))
    }, [selectedTab])


    const handleSelectSubjectTab = (event, newValue) => {
        if (newValue == addGroupTabValue) {
            setNewGroupDialogOpen(true)
            return
        } else {
            setSelectedTab(newValue)
        }
    }

    const handleAddDocumentToGroup = (title, groupId, examDate) => {
        let document = new DocumentModel(title, groupId, examDate)
        addDocument(document)
            .then(() => {
                setCurrentGroupDocuments([document, ...currentGroupDocuments])
            })
            .catch((error) => setError(error))
    }

    const handleCreateGroup = async (groupName) => {
        let newGroup = new GroupModel(groupName)
        await addGroup(newGroup)
        let updatedGroups = [
            ...groups,
            newGroup
        ]
        setGroups(updatedGroups)
        setSelectedTab(newGroup.id)
    }

    const handleCloseNewGroupDialog = () => {
        setNewGroupDialogOpen(false)
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

                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography
                            component="h5"
                            variant="h5"
                            color="text.primary"
                        >
                            Library
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '100%' }}>
                        <Tabs value={selectedTab} onChange={handleSelectSubjectTab} scrollButtons="auto" variant="scrollable">
                            {groups.map((group) => (<Tab label={group.title} value={group.id} key={group.id} sx={{ p: 0 }} />))}
                            <Tab icon={<Add />} iconPosition="start" label="Add group" value={addGroupTabValue} />
                        </Tabs>
                    </Box>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                >
                    <DocumentsList documents={currentGroupDocuments} addDocument={() => setNewDocumentDialogOpen(true)} />
                </Grid>

            </Container>

            <NewGroupDialog
                open={newGroupDialogOpen}
                onClose={handleCloseNewGroupDialog}
                handleSaveNewGroup={handleCreateGroup}
            />
            <NewDocumentDialog
                open={newDocumentDialogOpen}
                onClose={handleCloseNewDocumentDialog}
                groups={groups}
                selectedGroup={selectedTab}
                handleSaveNewDocument={handleAddDocumentToGroup}
            />
        </Box>
    )
}