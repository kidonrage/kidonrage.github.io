import CryptoJS from "crypto-js";

const encryptedApiKey = "U2FsdGVkX19v4dIcY4w8zw0P2bBgOa5YRNPI2yDoGoj43rF8iHycAyWZ7P03zw1CiwkDCFVnVQQLWZcS9z3EgYdATildG78y1aC9NctkBYg="
const encryptedUrl = "U2FsdGVkX19yxCbwKKqFG22kK6CE8U+YHxx6hY8ly/OJCDr9TT4sW3N44shPT8QC"

const apiUrl = CryptoJS.AES.decrypt(encryptedUrl, "dontstealthiskey").toString(CryptoJS.enc.Utf8);
const apiKey = CryptoJS.AES.decrypt(encryptedApiKey, "dontstealthiskey").toString(CryptoJS.enc.Utf8);

export async function paraphrase(text, temperature, instruction) {
    const body = {
        "model": "text-davinci-edit-001",
        "input": text,
        "temperature": temperature,
        "instruction": instruction,
    }
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
        method: 'POST'
    }

    let response = await fetch(apiUrl, params)

    if (!response.ok) {
        let error = await response.json()
        throw error.error
    }

    let responseObject = await response.json()

    return responseObject.choices[0].text
}