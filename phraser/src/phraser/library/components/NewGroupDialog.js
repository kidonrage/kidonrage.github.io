import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from "@mui/material";

export const NewGroupDialog = ({ handleSaveNewGroup, ...props }) => {

    const [title, setTitle] = React.useState('')

    const handleSave = () => {
        handleSaveNewGroup(title)
        close()
    }

    const close = () => {
        props.onClose()
        setTitle('')
    }

    return (
        <Dialog {...props} onClose={close} >
            <DialogTitle>New group</DialogTitle>
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