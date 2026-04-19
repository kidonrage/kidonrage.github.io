import moment from "moment"
import { guidGenerator } from "../utils"

const subjectsLSKey = "subjects"
const examsLSKey = "exams"
const documentsLSKey = "documents"
const questionGeneratorDocumentsContentLSKey = "q_gen_docs_content"

// === SUBJECTS ===

class SubjectModel {

    constructor(title) {
        this.id = guidGenerator()
        this.title = title
    }
}

export async function saveNewSubject(subjectTitle) {
    let subjectToSave = new SubjectModel(subjectTitle)
    let subjects = await fetchSubjects()
    let updatedSubjects = [...subjects, subjectToSave]
    localStorage.setItem(subjectsLSKey, JSON.stringify(updatedSubjects))
    return subjectToSave
}

export function fetchSubject(subjectId) {
    return new Promise((resolve, reject) => {
        const subjects = JSON.parse(localStorage.getItem(subjectsLSKey));
        resolve(subjects.find((subject) => subject.id === subjectId))
    });
}

export function fetchSubjects() {
    return new Promise((resolve, reject) => {
        let cachedSubjects = JSON.parse(localStorage.getItem(subjectsLSKey))
        resolve(!!cachedSubjects ? cachedSubjects : []);
    });
}

export async function updateSubject(subjectUpdate) {
    const subjectsToUpdate = await fetchSubjects()

    const updatedSubjectIndex = subjectsToUpdate.findIndex((subject) => subject.id === subjectUpdate.id)
    subjectsToUpdate[updatedSubjectIndex] = subjectUpdate

    localStorage.setItem(subjectsLSKey, JSON.stringify(subjectsToUpdate))

    return subjectUpdate
}

export async function removeSubject(subjectId) {
    // TODO
}

// === EXAMS ===

class ExamModel {

    constructor(title, subjectId) {
        this.id = guidGenerator()
        this.title = title
        this.documents = []
        this.subjectId = subjectId
    }
}

export async function addExam(examTitle, subjectId) {
    const exams = await fetchExams()
    let newExam = new ExamModel(examTitle, subjectId)
    localStorage.setItem(examsLSKey, JSON.stringify([...exams, newExam]))
    return newExam
}

export function fetchExams() {
    return new Promise((resolve, reject) => {
        const cachedExams = JSON.parse(localStorage.getItem(examsLSKey));
        resolve(cachedExams || [])
    });
}

export async function fetchExamsForSubjectWithId(subjectId) {
    const exams = await fetchExams()
    return exams.filter((exam) => exam.subjectId === subjectId)
}

export async function updateExam(examUpdate) {
    const examsToUpdate = await fetchExams()

    const updatedExamIndex = examsToUpdate.findIndex((exam) => exam.id === examUpdate.id)
    examsToUpdate[updatedExamIndex] = examUpdate

    localStorage.setItem(examsLSKey, JSON.stringify(examsToUpdate))

    return examUpdate
}

// === DOCUMENTS ===

class DocumentModel {

    constructor(title, examId, type) {
        this.id = guidGenerator()
        this.title = title
        this.type = type
        this.examId = examId
        this.creationDate = moment().unix()
    }
}

export async function addDocument(title, examId, type) {
    try {
        const documents = await fetchDocuments()
        let newDocument = new DocumentModel(title, examId, type)
        localStorage.setItem(documentsLSKey, JSON.stringify([...documents, newDocument]))
        return newDocument
    } catch (e) {
        console.error(e)
    }
}

export function fetchDocuments() {
    return new Promise((resolve, reject) => {
        const cachedDocuments = JSON.parse(localStorage.getItem(documentsLSKey));
        resolve(cachedDocuments || [])
    });
}

export async function fetchDocumentsForExamsWithIDs(examsIds) {
    const documents = await fetchDocuments()
    let result = {}
    console.log(examsIds)
    documents.forEach(document => {
        if (examsIds.includes(document.examId)) {
            result[document.examId] = [
                ...result[document.examId] || [],
                document
            ]
        }
    });
    return result
}

export async function updateDocument(documentUpdate) {
    const docsToUpdate = await fetchDocuments()

    const updatedExamIndex = docsToUpdate.findIndex((doc) => doc.id === documentUpdate.id)
    docsToUpdate[updatedExamIndex] = documentUpdate

    localStorage.setItem(documentsLSKey, JSON.stringify(docsToUpdate))

    return documentUpdate
}

export function fetchQuestions(documentId) {
    let key = getQuestionsLSKey(documentId)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let questions = JSON.parse(localStorage.getItem(key))
            resolve(!!questions ? questions : []);
        }, 300);
    });
}

// === DOCUMENTS CONTENT ===
export async function updateQuestionGeneratorDocumentContent(content, documentId) {
    const cachedQuestionGeneratorDocumentContent = JSON.parse(localStorage.getItem(questionGeneratorDocumentsContentLSKey)) || {};
    cachedQuestionGeneratorDocumentContent[documentId] = content
    localStorage.setItem(questionGeneratorDocumentsContentLSKey, JSON.stringify(cachedQuestionGeneratorDocumentContent))
}

export async function fetchQuestionGeneratorDocumentData(documentId) {
    const allDocuments = await fetchDocuments()
    const documentData = allDocuments.find(doc => doc.id === documentId)
    const cachedQuestionGeneratorDocumentContent = JSON.parse(localStorage.getItem(questionGeneratorDocumentsContentLSKey)) || {};
    console.log(documentId, documentData, cachedQuestionGeneratorDocumentContent)
    return {
        title: documentData.title,
        content: cachedQuestionGeneratorDocumentContent[documentId]
    }
}

export function setDocumentQuestions(questions = [], documentId) {
    let key = getQuestionsLSKey(documentId)
    console.log('setting document questions', questions, documentId)
    localStorage.setItem(key, JSON.stringify(questions))
}

export async function addQuestion(question) {
    let key = getQuestionsLSKey(question.document)
    let existingQuestions = await fetchQuestions(question.document)
    localStorage.setItem(key, JSON.stringify([
        question,
        ...existingQuestions,
    ]))
}

function getQuestionsLSKey(documentId) {
    return `${documentId}_questions`
}