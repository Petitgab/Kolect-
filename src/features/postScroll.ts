import { getMessages } from "./pullPosts.js";
import type { Message } from "./pullPosts.js";

let page = 1;
const nbPosts = 10;

let allPosts: Message[] = [];

async function loadMorePosts(): Promise<Message[]> {
    const newPosts = await getMessages(nbPosts, page);

    for (const post of newPosts) {
        allPosts.push(post);
    }

    page = page + 1;

    return allPosts;
}

function resetPosts(): void {
    page = 1;
    allPosts = [];
}

export { loadMorePosts, resetPosts };