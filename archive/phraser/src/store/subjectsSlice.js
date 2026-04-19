import { createSlice } from '@reduxjs/toolkit'

export const subjectsSlice = createSlice({
    name: 'subjects',
    initialState: {
        list: []
    },
    reducers: {
        set: (state, action) => {
            state.list = action.payload
        },
        addSubject: (state, action) => {
            state.list.push(action.payload)
        },
        updateSubject: (state, action) => {
            const updatedSubject = action.payload
            let updatedList = [...state.list]
            const updatedSubjectIndex = updatedList.findIndex(subject => subject.id === updatedSubject.id)
            updatedList[updatedSubjectIndex] = updatedSubject
            state.list = updatedList
        },
        removeSubject: (state, action) => {
            state.list = state.list.filter((subject) => subject.id !== action.payload.id)
        }
    },
})

// Action creators are generated for each case reducer function
export const { set, addSubject, updateSubject, removeSubject } = subjectsSlice.actions

export default subjectsSlice.reducer