let messagesElement = document.querySelector("#messages");

let formInputs = document.querySelector("#inputs");

let nameInput = formInputs.querySelector("#name");
let textInput = formInputs.querySelector("#text");

let nameErrorElement = formInputs.querySelector("#name-error");
let textErrorElement = formInputs.querySelector("#text-error");

let btnSubmitForm = formInputs.querySelector("button[type=submit]");

let webSocketConnection;

/**
 * Return if name is valid.
 * 
 * Conditions:
 * - Be filled
 * - Less than 10 characters
 * 
 * @param {string} name
 * @returns boolean
 */
function checkNameIsValid(name) {
    if (!name) {
        nameErrorElement.innerHTML = "Obrigatório!";

        return false;
    }

    if (name.length > 10) {
        nameErrorElement.innerHTML = "10 (Dez) caracteres no máximo!";

        return false;
    }

    return true;
}

/**
 * Return if text is valid.
 * 
 * Conditions:
 * - Be filled
 * - Less than 100 characters
 * 
 * @param {string} text 
 * @returns boolean
 */
function checkTextIsValid(text) {
    if (!text) {
        textErrorElement.innerHTML = "Obrigatório!";

        return false;
    }

    if (text.length > 100) {
        textErrorElement.innerHTML = "100 (Cem) caracteres no máximo!";

        return false;
    }

    return true;
}

/**
 * Open a connect using web socket.
 * 
 * @returns WebSocket
 */
 function connectWebSocket() {
    let connection = new WebSocket("ws://localhost:8080");

    connection.onopen = function(e) {
        formInputs.addEventListener("submit", handleSendMessage);

        console.log("Conexão estabelecida!");
    };

    connection.onmessage = function(e) {
        let {
            name,
            text
        } = JSON.parse(e.data);

        showMessage({
            name,
            text,
            isMyMessage: false
        });
    };

    return connection;
}

function handleRequestConnection(event) {
    event.preventDefault();

    nameInput.value = nameInput.value.trim();

    let nameIsValid = checkNameIsValid(nameInput.value);

    if (!nameIsValid) {
        nameInput.classList.add("is-invalid");

        return;
    }

    formInputs.removeEventListener("submit", handleRequestConnection);

    nameInput.classList.remove("is-invalid");
    nameInput.disabled = true;

    textInput.classList.remove("d-none");

    btnSubmitForm.innerHTML = "Enviar";

    webSocketConnection = connectWebSocket();
}

function handleSendMessage(event) {
    event.preventDefault()

    textInput.value = textInput.value.trim();

    let nameIsValid = checkTextIsValid(textInput.value);

    if (!nameIsValid) {
        textInput.classList.add("is-invalid");

        return;
    }

    let name = nameInput.value;
    let text = textInput.value;

    webSocketConnection.send(JSON.stringify({
        name,
        text
    }));

    showMessage({
        name,
        text,
        isMyMessage: true
    });

    textInput.classList.remove("is-invalid");
    textInput.value = "";
}

/**
 * Show message on window.
 * 
 * @param {object} dataMessage
 */
function showMessage({name, text, isMyMessage}) {
    messagesElement.innerHTML += `
        <div class="message w-100 mb-3">
            <div class="d-flex flex-column ${isMyMessage ? "align-items-end" : ""}">
                <span class="name-message fw-bold">${name}</span>
                <span class="text-message">${text}</span>
            </div>
        </div>`;
}

formInputs.addEventListener("submit", handleRequestConnection);
