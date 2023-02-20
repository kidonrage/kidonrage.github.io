const encryptedApiKey = "U2FsdGVkX19v4dIcY4w8zw0P2bBgOa5YRNPI2yDoGoj43rF8iHycAyWZ7P03zw1CiwkDCFVnVQQLWZcS9z3EgYdATildG78y1aC9NctkBYg="
const encryptedUrl = "U2FsdGVkX19yxCbwKKqFG22kK6CE8U+YHxx6hY8ly/OJCDr9TT4sW3N44shPT8QC"

const apiUrl = CryptoJS.AES.decrypt(encryptedUrl, "dontstealthiskey").toString(CryptoJS.enc.Utf8);
const apiKey = CryptoJS.AES.decrypt(encryptedApiKey, "dontstealthiskey").toString(CryptoJS.enc.Utf8);

async function mockParaphrase(text, temperature, instruction) {
    console.log(text, temperature, instruction);
    await delay(2000);

    return "d"
}

async function paraphrase(text, temperature, instruction) {
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

    let responseData = await fetch(apiUrl, params)
    let response = await responseData.json()

    return response.choices[0].text
}

let inputTextarea = document.getElementById('input-textarea')
let instructionInput = document.getElementById('instruction-input')
let temperatureInput = document.getElementById('temperature-input')
let temperatureValueLabel = document.getElementById('temperature-value')
let submitButton = document.getElementById('submit-button')
let inputForm = document.getElementById('input-form')
let resultContainer = document.getElementById('result-container')
let resultField = document.getElementById('result')
let resultDiffField = document.getElementById('result-diff')
let copyResultButton = document.getElementById('copy-button')
let spinner = document.getElementById('main-spinner')

spinner.hidden = true
resultContainer.hidden = true

inputTextarea.addEventListener("input", function (evt) {
    submitButton.disabled = isEmpty(evt.target.value)
})

temperatureInput.addEventListener("input", function (evt) {
    updateTemperature(evt.target.value)
})

inputTextarea.addEventListener("input", function (evt) {
    submitButton.disabled = isEmpty(evt.target.value)
})

inputForm.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    let input = evt.target.elements["input-textarea"].value
    let instruction = evt.target.elements["instruction-input"].value
    let temperature = parseFloat(evt.target.elements["temperature-input"].value)

    if (isEmpty(instruction)) {
        instruction = "Rephrase the question, change main variables"
    }

    if (isEmpty(input)) { return }
    spinner.hidden = false
    let result = await paraphrase(input, temperature, instruction)
    spinner.hidden = true
    if (isEmpty(result)) {
        resultContainer.hidden = true
    } else {
        resultContainer.hidden = false
        resultField.innerText = result

        var dmp = new diff_match_patch();
        var diff = dmp.diff_main(input, result);
        dmp.diff_cleanupSemantic(diff);
        var ds = dmp.diff_prettyHtml(diff);
        resultDiffField.innerHTML = ds
    }
}, true);

updateTemperature(0.75)

function updateTemperature(updatedTemperature) {
    temperature = updatedTemperature
    temperatureInput.value = `${updatedTemperature}`
    temperatureValueLabel.innerText = `${updatedTemperature}`
}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

copyResultButton.addEventListener('click', function (event) {
    copyTextToClipboard(resultField.innerText);
});

const delay = ms => new Promise(res => setTimeout(res, ms));
const isEmpty = str => (!str || str.length === 0);

