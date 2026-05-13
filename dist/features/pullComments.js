import API_BASE_URL from "../env.js";
async function getComments(messageId) {
    const response = await fetch(API_BASE_URL + "/comments?message_id=" + messageId + "&nb_comments=5&page=1");
    const result = await response.json();
    return result.data;
}
export { getComments };
