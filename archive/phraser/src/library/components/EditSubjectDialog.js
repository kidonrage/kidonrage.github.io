import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from "@mui/material";

export const EditSubjectDialog = ({ handleSaveSubject, editingSubject, ...props }) => {

    const [title, setTitle] = React.useState('')

    useEffect(() => {
        setTitle(editingSubject?.title)
    }, [editingSubject])

    const handleSave = () => {
        handleSaveSubject({
            ...editingSubject,
            title
        })
        close()
    }

    const close = () => {
        props.onClose()
    }

    return (
        <Dialog {...props} onClose={close} >
            <DialogTitle>Edit</DialogTitle>
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