const usernameInput = document.getElementById("username") as HTMLInputElement;
const loginButton = document.getElementById("login-button");

function login(): void {
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