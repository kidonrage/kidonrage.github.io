import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from "@mui/material";

import { addSubject } from "../store/subjectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { saveNewSubject } from "../utils/libraryRepository";

export const NewSubjectDialog = ({ handleSaveNewSubject, ...props }) => {

    const [title, setTitle] = React.useState('')

    const newSubjectAddedHandler = useSelector((state) => state.newSubjectDialog.newSubjectAddedHandler)

    const dispatch = useDispatch()

    const handleSave = async () => {
        const newSubject = await saveNewSubject(title)
        dispatch(addSubject(newSubject))
        newSubjectAddedHandler(newSubject)
        close()
    }

    const close = () => {
        props.onClose()
        setTitle('')
    }

    return (
        <Dialog {...props} onClose={close} >
            <DialogTitle>New subject</DialogTitle>
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
                <Button disabled={!title} onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}