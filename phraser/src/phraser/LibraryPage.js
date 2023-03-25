import React, { useEffect } from "react";

import { Grid, Box, Container, Button, TextField, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Add from "@mui/icons-material/Add";
import { DocumentsList } from "./library/DocumentsList";
import { guidGenerator } from "../utils";
import { NewDocumentDialog } from "./library/NewDocumentDialog";
import { NewGroupDialog } from "./library/NewGroupDialog";

class DocumentModel {

    constructor(title, examDate) {
        this.id = guidGenerator()
        this.title = title
        this.examDate = examDate
    }
}

class GroupModel {

    constructor(title, documents) {
        this.id = guidGenerator()
        this.title = title
        this.documents = documents
    }
}

export const LibraryPage = ({ setError }) => {

    const [groups, setGroups] = React.useState([])
    const addGroupTabValue = 'add'

    const [selectedTab, setSelectedTab] = React.useState('')
    const [currentGroupDocuments, setCurrentGroupDocuments] = React.useState([])

    const [newGroupDialogOpen, setNewGroupDialogOpen] = React.useState(false)
    const [newDocumentDialogOpen, setNewDocumentDialogOpen] = React.useState(false)

    const handleSelectSubjectTab = (event, newValue) => {
        if (newValue == addGroupTabValue) {
            setNewGroupDialogOpen(true)
            return
        } else {
            setSelectedTab(newValue)
        }
    }

    const handleAddDocumentToGroup = (title, groupId, examDate) => {
        const groupIndex = groups.findIndex((group) => group.id == groupId)
        if (groupIndex == -1) { return }

        var updatedGroups = [...groups]
        updatedGroups[groupIndex].documents = [
            ...updatedGroups[groupIndex].documents,
            new DocumentModel(title, examDate)
        ]
        setGroups(updatedGroups)
    }

    const handleCreateGroup = (groupName) => {
        let newGroup = new GroupModel(groupName, [])
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

    useEffect(() => {
        let mockedFirstModel = new GroupModel('Math', [
            new DocumentModel('Something in math', null),
            new DocumentModel('Something in math', null)
        ])
        setGroups([mockedFirstModel])
        setSelectedTab(mockedFirstModel.id)
    }, [])

    useEffect(() => {
        let selectedGroupIndex = groups.findIndex(group => group.id == selectedTab)
        var documents = []
        if (selectedGroupIndex > -1) {
            documents = groups[selectedGroupIndex].documents
        }
        setCurrentGroupDocuments(documents)
    }, [groups, selectedTab])

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
                // justifyContent="space-between"
                // alignItems="center"
                // sx={{ pb: 4 }}
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