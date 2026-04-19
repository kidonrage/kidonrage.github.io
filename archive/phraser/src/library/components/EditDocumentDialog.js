import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from "@mui/material";

export const EditDocumentDialog = ({ handleSaveDocument, editingDocument, ...props }) => {

    const [title, setTitle] = React.useState('')

    useEffect(() => {
        setTitle(editingDocument?.title)
    }, [editingDocument])

    const handleSave = () => {
        handleSaveDocument({
            ...editingDocument,
            title
        })
        close()
    }

    const close = () => {
        props.onClose()
    }

    return (
        <Dialog {...props} onClose={close} >
            <DialogTitle>Edit document</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    columnSpacing={2}
                    direction="row"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button disabled={!title} onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}