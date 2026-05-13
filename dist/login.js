"use strict";
const usernameInput = document.getElementById("username");
const loginButton = document.getElementById("login-button");
function login() {
    const username = usernameInput.value;
    if (username === "") {
        alert("Il faut entrer un pseudo");
        return;
    }
    localStorage.setItem("username", username);
    window.location.href = "feed.html";
}
if (loginButton !== null) {
    loginButton.addEventListener("click", login);
}
