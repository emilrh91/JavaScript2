import { getToken } from "./fetchPosts.js";
import { API_BASE_URL } from "./api.js";

/**
 * Generates the query parameters based on the provided options.
 * 
 * @param {Object} options - Options for generating the query parameters.
 * @param {boolean} [options.includeAuthor] - Include author in the response.
 * @param {boolean} [options.includeComments] - Include comments in the response.
 * @param {boolean} [options.includeReactions] - Include reactions in the response.
 * @returns {string} The generated query parameters.
 */
function generateQueryParams(options) {
    const mappings = {
        includeAuthor: '_author=true',
        includeComments: '_comments=true',
        includeReactions: '_reactions=true'
    };

    return Object.keys(options)
        .filter(option => options[option])
        .map(option => mappings[option])
        .join('&');
}

/**
 * Fetches a single post by its ID.
 *
 * @param {number|string} postId - The ID of the post to fetch.
 * @param {Object} options - Options for fetching the post.
 * @param {boolean} [options.includeAuthor] - Include author in the response.
 * @param {boolean} [options.includeComments] - Include comments in the response.
 * @param {boolean} [options.includeReactions] - Include reactions in the response.
 * @returns {Promise<Object>} The fetched post data.
 * @throws {Error} Throws an error if fetching fails.
 */
export async function fetchOneSinglePost(postId, options = {}) {
    const queryParams = generateQueryParams(options);
    const token = await getToken();

    let url = `${API_BASE_URL}/social/posts/${postId}`;
    if (queryParams) {
        url += `?${queryParams}`;
    }

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch post');
    }

    return response.json();
}
