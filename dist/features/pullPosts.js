import API_BASE_URL from "../env.js";
async function getMessages() {
    const response = await fetch(API_BASE_URL + "/messages?nb_messages=20&page=1");
    const result = await response.json();
    return result.data;
}
export { getMessages };
