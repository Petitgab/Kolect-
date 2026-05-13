import { getMessages } from "./features/pullPosts.js";
import { createPost } from "./features/createPost.js";
const usernameInput = document.getElementById("username");
const contentInput = document.getElementById("content");
const sendButton = document.getElementById("send-button");
const postsDiv = document.getElementById("posts");
function showMessages(messages) {
    if (postsDiv === null) {
        return;
    }
    postsDiv.innerHTML = "";
    for (const message of messages) {
        const post = document.createElement("div");
        const username = document.createElement("h3");
        username.textContent = message.username;
        const content = document.createElement("p");
        content.textContent = message.content;
        const likes = document.createElement("small");
        likes.textContent = "Likes : " + message.like;
        const line = document.createElement("hr");
        post.appendChild(username);
        post.appendChild(content);
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
    const username = usernameInput.value;
    const content = contentInput.value;
    if (username === "") {
        alert("Il faut entrer un pseudo");
        return;
    }
    if (content === "") {
        alert("Il faut écrire un message");
        return;
    }
    await createPost(username, content);
    contentInput.value = "";
    loadMessages();
}
if (sendButton !== null) {
    sendButton.addEventListener("click", sendPost);
}
loadMessages();
