form.addEventListener("submit", A);

function A(event) {
    event.preventDefault();
    var messages = [errorMessage, окMessage];
    if (userName.value === '' || userName.value == null || userLastName.value === '' || userLastName.value == null) {
        messages.push(errorMessage);
        messageElement.innerHTML = messages[0];
    } else {
        messages.push(окMessage);
        messageElement.innerHTML = messages[1];
    }
}