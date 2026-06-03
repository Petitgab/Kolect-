import {config} from "../env.js";

export type Comment = {
    id: number;
    message_id: number;
    username: string;
    content: string;
};

async function getComments(messageId: number): Promise<Comment[]> {
    const response = await fetch(
        config.API_URL + "comments?message_id=" + messageId + "&nb_comments=5&page=1"
    );

    const result = await response.json();

    return result.data;
}

export { getComments };