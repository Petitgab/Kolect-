import {config} from "../../env.js";

async function createPost(username: string, content: string): Promise<void> {
    await fetch(config.API_URL + "message", {
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