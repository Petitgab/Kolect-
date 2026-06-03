import { createPost } from "./features/createPost.js";
import { loadMorePosts, resetPosts } from "./features/postScroll.js";
import { getComments } from "./features/pullComments.js";
import { likePost } from "./features/pullLikes.js";
import { dislikepost} from "./features/pullDislikes.js"

import type { Message } from "./features/pullPosts.js";
import type { Comment } from "./features/pullComments.js";

const connectedUser = document.getElementById("connected-user");
const contentInput = document.getElementById("content") as HTMLTextAreaElement;
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

function getLikedPosts(): number[] {
  const likedPosts = localStorage.getItem("likedPosts");

  if (likedPosts === null) {
    return [];
  }

  return JSON.parse(likedPosts);
}

function saveLikedPost(messageId: number): void {
  const likedPosts = getLikedPosts();

  likedPosts.push(messageId);

  localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
}

function deletesavedlike(messageId: number): void {
  const likedPosts = getLikedPosts();

  let remover = likedPosts.indexOf(messageId)
  likedPosts.splice(remover,1);

  localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
}

function hasAlreadyLiked(messageId: number): boolean {
  const likedPosts = getLikedPosts();

  return likedPosts.includes(messageId);
}

function showComments(commentsDiv: HTMLElement, comments: Comment[]): void {
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

async function loadComments(messageId: number, commentsDiv: HTMLElement): Promise<void> {
  const comments = await getComments(messageId);

  showComments(commentsDiv, comments);
}

function showMessages(messages: Message[]): void {
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
    const dislikebutton = document.createElement("button");
    likeButton.textContent = "Like";
    dislikebutton.textContent = "Retirer Like";
    

    if (hasAlreadyLiked(message.id)) {
      likeButton.hidden = true
    } else {
      likeButton.disabled = false;
      likeButton.hidden = false
    }

    if (hasAlreadyLiked(message.id)) {
      dislikebutton.disabled = false;
      dislikebutton.hidden = false
    } else {
      dislikebutton.hidden = true
    }

    likeButton.addEventListener("click", async function () {
      likeButton.disabled = true;

      await likePost(message.id);

      saveLikedPost(message.id);

      resetPosts();

      const posts = await loadMorePosts();

      showMessages(posts);
    });

    dislikebutton.addEventListener("click", async function () {
      dislikebutton.disabled = true

      await dislikepost (message.id);

      deletesavedlike(message.id);

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
    post.appendChild(dislikebutton);
    post.appendChild(document.createElement("br"));
    post.appendChild(commentsButton);
    post.appendChild(commentsDiv);
    post.appendChild(line);

    postsDiv.appendChild(post);
  }
}

async function loadPosts(): Promise<void> {
  const posts = await loadMorePosts();

  showMessages(posts);
}

async function sendPost(): Promise<void> {
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