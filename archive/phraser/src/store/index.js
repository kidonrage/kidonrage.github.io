import { configureStore } from '@reduxjs/toolkit'
import addSubjectDialogSlice from './addSubjectDialogSlice'
import newExamTypeDialogSlice from './newExamTypeDialogSlice'
import subjectsSlice from './subjectsSlice'

export default configureStore({
    reducer: {
        subjects: subjectsSlice,
        newSubjectDialog: addSubjectDialogSlice,
        newExamDialog: newExamTypeDialogSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ['newSubjectDialog.newSubjectAddedHandler', 'newExamDialog.newExamAddedHandler'],
            },
        }),
})