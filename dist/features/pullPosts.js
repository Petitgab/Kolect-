import { config } from "../env.js";
async function getMessages(nbMessages, page) {
    const response = await fetch(config.API_URL + "messages?nb_messages=" + nbMessages + "&page=" + page);
    const result = await response.json();
    return result.data;
}
export { getMessages };
