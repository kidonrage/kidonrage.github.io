import React from "react";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Grid } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export const NewDocumentDialog = ({ selectedGroup, handleSaveNewDocument, groups = [], ...props }) => {

    const [title, setTitle] = React.useState('')
    const [group, setGroup] = React.useState('')
    const [date, setDate] = React.useState(null)

    const handleSave = () => {
        handleSaveNewDocument(title, group, date.unix())
        close()
    }

    const close = () => {
        props.onClose()
        setTitle('')
        setGroup(selectedGroup)
    }

    React.useEffect(() => {
        setGroup(selectedGroup)
    }, [selectedGroup])

    return (
        <Dialog {...props} onClose={close} >
            <DialogTitle>New document</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    columnSpacing={2}
                    direction="row"
                    // justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
                        <FormControl margin="dense" sx={{ width: '100%' }}>
                            <InputLabel id="group-select-label">Group</InputLabel>
                            <Select
                                labelId="group-select-label"
                                id="group-select"
                                value={group}
                                label="Group"
                                onChange={(e) => { setGroup(e.target.value) }}
                            >
                                {groups.map(group => (
                                    <MenuItem key={group.id} value={group.id}>{group.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Exam Date"
                                value={date}
                                onChange={(newValue) => { setDate(newValue) }}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button disabled={!(!!title && !!group)} onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}