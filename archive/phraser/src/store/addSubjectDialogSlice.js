import { createSlice } from '@reduxjs/toolkit'

export const addSubjectDialogSlice = createSlice({
    name: 'addSubjectDialog',
    initialState: {
        open: false,
        newSubjectAddedHandler: () => { }
    },
    reducers: {
        open: (state, action) => {
            state.open = true
            state.newSubjectAddedHandler = action.payload.newSubjectAddedHandler || (() => { })
        },
        close: (state) => {
            state.open = false
            state.newSubjectAddedHandler = (() => { })
        },
    },
})

export const { open, close } = addSubjectDialogSlice.actions

export default addSubjectDialogSlice.reducer