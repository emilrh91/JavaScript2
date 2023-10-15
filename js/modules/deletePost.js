import { getToken } from "./fetchPosts.js";
import { API_BASE_URL } from "./api.js";

/**
 * Deletes a post by its ID.
 *
 * @param {number|string} postId - The ID of the post to delete.
 * @returns {Promise<Object>} The response data from the server.
 * @throws {Error} Throws an error if the deletion fails.
 */
export async function deletePost(postId) {
    const token = await getToken();
    const url = `${API_BASE_URL}/social/posts/${postId}`;
    
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post');
    }

    return response.json();
}

/**
 * Attaches a delete event listener to a post's delete button.
 * 
 * @param {HTMLElement} postDiv - The parent div element of the post.
 * @param {number|string} postId - The ID of the post.
 * @param {HTMLElement} postElement - The post's DOM element.
 */
export function attachDeleteListener(postDiv, postId, postElement) {
    const deleteButton = postDiv.querySelector('.delete-post');
    deleteButton.addEventListener("click", async function () {
        try {
            await deletePost(postId);
            alert("Post deleted successfully!");
            postElement.remove();
        } catch (error) {
            alert("Error deleting the post. Please try again.");
        }
    });
}
