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

    connection.onopen = function (e) {
        showFormWhenConnected();

        console.log("Conexão estabelecida!");
    };

    connection.onerror = function (e) {
        showFormWhenDisconnected();

        let name = nameInput.value;

        showMessage({
            name: name,
            text: "Erro de conexão com socket",
            isMyMessage: true
        });
    };

    connection.onmessage = function (e) {
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

    nameInput.classList.remove("is-invalid");

    webSocketConnection = connectWebSocket();
}

function handleSendMessage(event) {
    event.preventDefault()

    textInput.value = textInput.value.trim();

    let textIsValid = checkTextIsValid(textInput.value);

    if (!textIsValid) {
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

function showFormWhenDisconnected() {
    nameInput.disabled = false;

    textInput.classList.add("d-none");

    btnSubmitForm.innerHTML = "Conectar";

    formInputs.removeEventListener("submit", handleSendMessage);
    formInputs.addEventListener("submit", handleRequestConnection);
}

function showFormWhenConnected() {
    nameInput.disabled = true;

    textInput.classList.remove("d-none");

    btnSubmitForm.innerHTML = "Enviar";

    formInputs.removeEventListener("submit", handleRequestConnection);
    formInputs.addEventListener("submit", handleSendMessage);
}

/**
 * Show message on window.
 * 
 * @param {object} dataMessage
 */
function showMessage({ name, text, isMyMessage }) {
    messagesElement.innerHTML += `
        <div class="message w-100 mb-3">
            <div class="d-flex flex-column ${isMyMessage ? "align-items-end" : ""}">
                <span class="name-message fw-bold">${name}</span>
                <span class="text-message"><pre>${text}</pre></span>
            </div>
        </div>`;
}

formInputs.addEventListener("submit", handleRequestConnection);
