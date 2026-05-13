import { createPost } from "./features/createPost.js";
import { loadMorePosts, resetPosts } from "./features/postScroll.js";
import { getComments } from "./features/pullComments.js";
import { likePost } from "./features/pullLikes.js";
const connectedUser = document.getElementById("connected-user");
const contentInput = document.getElementById("content");
const sendButton = document.getElementById("send-button");
const loadMoreButton = document.getElementById("load-more-button");
const postsDiv = document.getElementById("posts");
const username = localStorage.getItem("username");
if (username === null) {
    window.location.href = "index.html";
}
if (connectedUser !== null && username !== null) {
    connectedUser.textContent = "Connecté en tant que : " + username;
}
function getLikedPosts() {
    const likedPosts = localStorage.getItem("likedPosts");
    if (likedPosts === null) {
        return [];
    }
    return JSON.parse(likedPosts);
}
function saveLikedPost(messageId) {
    const likedPosts = getLikedPosts();
    likedPosts.push(messageId);
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
}
function hasAlreadyLiked(messageId) {
    const likedPosts = getLikedPosts();
    return likedPosts.includes(messageId);
}
function showComments(commentsDiv, comments) {
    commentsDiv.innerHTML = "";
    for (const comment of comments) {
        const commentDiv = document.createElement("div");
        const commentUsername = document.createElement("strong");
        commentUsername.textContent = comment.username;
        const commentContent = document.createElement("p");
        commentContent.textContent = comment.content;
        commentDiv.appendChild(commentUsername);
        commentDiv.appendChild(commentContent);
        commentsDiv.appendChild(commentDiv);
    }
}
async function loadComments(messageId, commentsDiv) {
    const comments = await getComments(messageId);
    showComments(commentsDiv, comments);
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
        const likeButton = document.createElement("button");
        if (hasAlreadyLiked(message.id)) {
            likeButton.textContent = "Déjà liké";
            likeButton.disabled = true;
        }
        else {
            likeButton.textContent = "Like";
        }
        likeButton.addEventListener("click", async function () {
            if (hasAlreadyLiked(message.id)) {
                alert("Tu as déjà liké ce post");
                return;
            }
            await likePost(message.id);
            saveLikedPost(message.id);
            resetPosts();
            const posts = await loadMorePosts();
            showMessages(posts);
        });
        const commentsButton = document.createElement("button");
        commentsButton.textContent = "Voir les commentaires";
        const commentsDiv = document.createElement("div");
        commentsButton.addEventListener("click", function () {
            loadComments(message.id, commentsDiv);
        });
        const line = document.createElement("hr");
        post.appendChild(postUsername);
        post.appendChild(postContent);
        post.appendChild(likes);
        post.appendChild(document.createElement("br"));
        post.appendChild(likeButton);
        post.appendChild(document.createElement("br"));
        post.appendChild(commentsButton);
        post.appendChild(commentsDiv);
        post.appendChild(line);
        postsDiv.appendChild(post);
    }
}
async function loadPosts() {
    const posts = await loadMorePosts();
    showMessages(posts);
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
    contentInput.value = "";
    resetPosts();
    const posts = await loadMorePosts();
    showMessages(posts);
}
if (sendButton !== null) {
    sendButton.addEventListener("click", sendPost);
}
if (loadMoreButton !== null) {
    loadMoreButton.addEventListener("click", loadPosts);
}
loadPosts();
