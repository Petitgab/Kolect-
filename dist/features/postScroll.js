import { getMessages } from "./pullPosts.js";
let page = 1;
const nbPosts = 10;
let allPosts = [];
async function loadMorePosts() {
    const newPosts = await getMessages(nbPosts, page);
    for (const post of newPosts) {
        allPosts.push(post);
    }
    page = page + 1;
    return allPosts;
}
function resetPosts() {
    page = 1;
    allPosts = [];
}
export { loadMorePosts, resetPosts };
