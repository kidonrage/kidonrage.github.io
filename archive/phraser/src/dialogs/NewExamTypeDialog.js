import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { addExam } from "../utils/libraryRepository";

export const NewExamTypeDialog = ({ handleSaveNewExamType, ...props }) => {

    const [title, setTitle] = React.useState('')

    const subjectId = useSelector((state) => state.newExamDialog.subjectId)
    const newExamAddedHandler = useSelector((state) => state.newExamDialog.newExamAddedHandler)

    const dispatch = useDispatch()

    const handleSave = async () => {
        const savedExam = await addExam(title, subjectId)
        newExamAddedHandler(savedExam)
        close()
    }

    const close = () => {
        props.onClose()
        setTitle('')
    }
    return (
        <Dialog {...props} onClose={close} >
            <DialogTitle>New exam type</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    columnSpacing={2}
                    direction="row"
                    // justifyContent="space-between"
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
                <Button disabled={!title || !subjectId} onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}