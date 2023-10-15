import { getToken } from "./fetchPosts.js";
import { buildApiUrl } from "./api.js";

/**
 * Sends a request to add a comment to a specific post.
 *
 * @async
 * @param {string} postId - The ID of the post to which the comment should be added.
 * @param {string} body - The content of the comment.
 * @returns {Promise<Object>} A promise that resolves with the added comment data.
 * @throws {Error} Throws an error if the request fails.
 */
export async function addCommentToPostAPI(postId, body) {
    const token = getToken();
    const url = buildApiUrl(`social/posts/${postId}/comment`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ body: body })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to add comment. Status: ${response.status}. Message: ${errorData.message || ''}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

/**
 * Attaches an event listener to the comment form in order to add comments.
 *
 * @param {HTMLElement} postDiv - The div element containing the post data.
 * @param {string} postId - The ID of the post to which comments are being added.
 */
export function attachCommentSubmission(postDiv, postId) {
    const commentForm = postDiv.querySelector('.add-comment-form');
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newCommentText = e.target.querySelector('.new-comment-text').value;
        if (!newCommentText) return;

        addCommentToPostAPI(postId, newCommentText)
        .then(addedComment => {
            const newComment = `<div class="comment">${addedComment.body} - <span class="comment-author">${addedComment.author.name || 'Unknown'}</span></div>`;
            postDiv.querySelector('.comments').innerHTML += newComment;
            e.target.querySelector('.new-comment-text').value = '';
        })
        .catch(error => {
            console.error("Error adding the comment to the post:", error);
        });
    });
}
