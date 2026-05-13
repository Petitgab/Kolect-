import API_BASE_URL from "../env.js";
async function likePost(messageId) {
    await fetch(API_BASE_URL + "/message/like", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message_id: messageId
        })
    });
}
export { likePost };
