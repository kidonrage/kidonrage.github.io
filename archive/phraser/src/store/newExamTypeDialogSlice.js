import { createSlice } from '@reduxjs/toolkit'

export const newExamTypeDialogSlice = createSlice({
    name: 'newExamTypeDialog',
    initialState: {
        open: false,
        subjectId: '',
        newExamAddedHandler: () => { }
    },
    reducers: {
        open: (state, action) => {
            state.open = true
            state.subjectId = action.payload.subjectId
            state.newExamAddedHandler = action.payload.newExamAddedHandler || (() => { })
        },
        close: (state) => {
            state.open = false
            state.newExamAddedHandler = (() => { })
        },
    },
})

export const { open, close } = newExamTypeDialogSlice.actions

export default newExamTypeDialogSlice.reducer