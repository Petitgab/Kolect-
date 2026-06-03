import { config } from "../env.js";
async function getComments(messageId) {
    const response = await fetch(config.API_URL + "comments?message_id=" + messageId + "&nb_comments=5&page=1");
    const result = await response.json();
    return result.data;
}
export { getComments };
