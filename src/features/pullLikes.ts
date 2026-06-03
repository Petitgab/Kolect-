import {config} from "../env.js";

async function likePost(messageId: number): Promise<void> {
    await fetch(config.API_URL + "message/like", {
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