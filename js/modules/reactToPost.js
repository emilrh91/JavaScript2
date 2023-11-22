import { getToken } from "./fetchPosts.js";
import { API_BASE_URL } from "./api.js";


/**
 * Reacts to a post by sending a PUT request to the API with the chosen reaction symbol.
 * 
 * @async
 * @param {string} postId - The ID of the post to react to.
 * @param {string} symbol - The reaction symbol (emoji).
 * @returns {Promise<Object>} The response object from the API containing the updated reaction data.
 * @throws {Error} Throws an error if the API response is not successful.
 */
export async function reactToPost(postId, symbol) {
    const token = await getToken();
    const encodedSymbol = encodeURIComponent(symbol);
    const url = `${API_BASE_URL}/social/posts/${postId}/react/${encodedSymbol}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reaction: symbol })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Failed to react to post: " + (errorData.message || response.statusText));
    }

    return await response.json();
}