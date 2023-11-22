import { generatePostHTML } from "./postHTMLGenerators.js";

/**
 * Creates and returns a new post <div> element based on the provided post data and user ID.
 * 
 * @param {Object} post - The post data.
 * @param {string} currentUserId - The ID of the current user.
 * @returns {HTMLElement} The DOM element representing a post.
 */
export function createPostDiv(post, currentUserId) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post", "card", "mb-3");  
    postDiv.innerHTML = generatePostHTML(post, currentUserId);
    return postDiv;
}