import {config} from "../env.js";

async function dislikepost(messageId: number): Promise<void> {
    await fetch(config.API_URL + "message/dislike", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message_id: messageId
        })
    });
}
export { dislikepost };