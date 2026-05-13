import API_BASE_URL from "../env.js";
async function getMessages(nbMessages, page) {
    const response = await fetch(API_BASE_URL + "/messages?nb_messages=" + nbMessages + "&page=" + page);
    const result = await response.json();
    return result.data;
}
export { getMessages };
