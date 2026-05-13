import API_BASE_URL from "../env.js";
async function createPost(username, content) {
    await fetch(API_BASE_URL + "/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            content: content
        })
    });
}
export { createPost };
