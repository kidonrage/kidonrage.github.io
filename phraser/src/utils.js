import CryptoJS from "crypto-js";

const encryptedApiKey = "U2FsdGVkX19v4dIcY4w8zw0P2bBgOa5YRNPI2yDoGoj43rF8iHycAyWZ7P03zw1CiwkDCFVnVQQLWZcS9z3EgYdATildG78y1aC9NctkBYg="
const encryptedEditsEndpointUrl = "U2FsdGVkX19yxCbwKKqFG22kK6CE8U+YHxx6hY8ly/OJCDr9TT4sW3N44shPT8QC"
const encryptedCompletionEndpointUrl = "U2FsdGVkX196tQm0W8Ep2EpnmvU9FGRWwfv6HewmRSWQxJj2dxc8AZL4DtDRsm28p+AoFA2EeUI+LFS/PuxuuQ=="

const apiKey = CryptoJS.AES.decrypt(encryptedApiKey, "dontstealthiskey").toString(CryptoJS.enc.Utf8);

export async function paraphrase(text) {
    const body = {
        "model": "text-davinci-003",
        "prompt": `Rephrase question and change its main variables: ${text}`,
        "temperature": 0.9
    }
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
        method: 'POST'
    }

    const apiUrl = CryptoJS.AES.decrypt(encryptedCompletionEndpointUrl, "dontstealthiskey").toString(CryptoJS.enc.Utf8);
    let response = await fetch(apiUrl, params)

    if (!response.ok) {
        let error = await response.json()
        throw error.error
    }

    let responseObject = await response.json()

    return responseObject.choices[0].text.replace(/^\s+|\s+$/g, '')
}

export async function generateQuestions(context, questionsCount, questionsType) {
    const body = {
        "model": "text-davinci-003",
        "prompt": `Generate ${questionsCount} ${questionsType} questions based on this text: ${context}`,
        "temperature": 0.9,
        "max_tokens": 512
    }
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
        method: 'POST'
    }

    const apiUrl = CryptoJS.AES.decrypt(encryptedCompletionEndpointUrl, "dontstealthiskey").toString(CryptoJS.enc.Utf8);
    let response = await fetch(apiUrl, params)

    if (!response.ok) {
        let error = await response.json()
        throw error.error
    }

    let responseObject = await response.json()

    return responseObject.choices[0].text.replace(/^\s+|\s+$/g, '')
}