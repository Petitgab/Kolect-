import { getMessages } from "./features/pullPosts.js";
import { createPost } from "./features/createPost.js";
const connectedUser = document.getElementById("connected-user");
const contentInput = document.getElementById("content");
const sendButton = document.getElementById("send-button");
const postsDiv = document.getElementById("posts");
const username = localStorage.getItem("username");
if (username === null) {
    window.location.href = "index.html";
}
if (connectedUser !== null && username !== null) {
    connectedUser.textContent = "Connecté en tant que : " + username;
}
function showMessages(messages) {
    if (postsDiv === null) {
        return;
    }
    postsDiv.innerHTML = "";
    for (const message of messages) {
        const post = document.createElement("div");
        const postUsername = document.createElement("h3");
        postUsername.textContent = message.username;
        const postContent = document.createElement("p");
        postContent.textContent = message.content;
        const likes = document.createElement("small");
        likes.textContent = "Likes : " + message.like;
        const line = document.createElement("hr");
        post.appendChild(postUsername);
        post.appendChild(postContent);
        post.appendChild(likes);
        post.appendChild(line);
        postsDiv.appendChild(post);
    }
}
async function loadMessages() {
    const messages = await getMessages();
    showMessages(messages);
}
async function sendPost() {
    if (username === null) {
        return;
    }
    const content = contentInput.value;
    if (content === "") {
        alert("Il faut écrire un message");
        return;
    }
    await createPost(username, content);
    window.location.href = "feed.html";
}
if (sendButton !== null) {
    sendButton.addEventListener("click", sendPost);
}
loadMessages();
