import { config } from "../../env.js";

export type Message = {
    id: number;
    username: string;
    content: string;
    like: number;
};

async function getMessages(): Promise<Message[]> {
    const response = await fetch(config.API_URL + "messages?nb_messages=20&page=1");
    const result = await response.json();

    return result.data;
}

export { getMessages };