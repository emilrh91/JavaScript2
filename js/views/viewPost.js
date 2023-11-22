import { fetchOneSinglePost } from '../modules/fetchOneSinglePost.js';
import { renderOneSinglePost } from '../modules/renderOneSinglePost.js';

document.addEventListener('DOMContentLoaded', initializePostView);

/**
 * Initializes the post view by fetching and rendering the post.
 */
function initializePostView() {
    const postId = getPostIdFromUrl();

    if (postId) {
        fetchAndRenderPost(postId);
    }
}

/**
 * Retrieves the post ID from the current URL.
 * 
 * @returns {string|null} The post ID or null if not found.
 */
function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Fetches the post data and renders it.
 * 
 * @param {string} postId - The ID of the post to fetch and render.
 */
function fetchAndRenderPost(postId) {
    const options = {
        includeAuthor: true,
        includeComments: true,
        includeReactions: true
    };

    fetchOneSinglePost(postId, options)
        .then(post => renderOneSinglePost([post])) // Since renderOneSinglePost expects an array, wrap the post in an array.
        .catch(handleFetchPostError);
}

/**
 * Handles errors that occur during post fetching.
 * 
 * @param {Error} error - The error object.
 */
function handleFetchPostError(error) {
}
