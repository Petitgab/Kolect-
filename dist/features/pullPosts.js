import { config } from "../env.js";
async function getMessages() {
    const response = await fetch(config.API_URL + "messages?nb_messages=20&page=1");
    const result = await response.json();
    return result.data;
}
export { getMessages };
