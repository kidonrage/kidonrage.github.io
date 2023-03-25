const groupsLSKey = "groups"

export function fetchGroups() {
    return new Promise((resolve, reject) => {
        let cachedGroups = JSON.parse(localStorage.getItem(groupsLSKey))
        resolve(!!cachedGroups ? cachedGroups : []);
    });
}

export async function addGroup(group) {
    let groups = await fetchGroups()
    let updatedGroups = [...groups, group]
    localStorage.setItem(groupsLSKey, JSON.stringify(updatedGroups))
}

export function fetchDocuments(groupId) {
    let key = getDocumentsLSKey(groupId)
    return new Promise((resolve, reject) => {
        let cachedDocuments = JSON.parse(localStorage.getItem(key))
        resolve(!!cachedDocuments ? cachedDocuments : []);
    });
}

export async function addDocument(document) {
    let key = getDocumentsLSKey(document.group)
    let existingGroupDocuments = await fetchDocuments(document.group)
    localStorage.setItem(key, JSON.stringify([
        document,
        ...existingGroupDocuments,
    ]))
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

function getDocumentsLSKey(groupId) {
    return `${groupId}_documents`
}

function getQuestionsLSKey(documentId) {
    return `${documentId}_questions`
}