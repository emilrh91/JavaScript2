import { buildApiUrl } from "./api.js";

/**
 * Retrieves the JWT token from the local storage.
 *
 * @returns {string|null} The JWT token, or null if it doesn't exist.
 */
export function getToken() {
    return localStorage.getItem("jwt_token");
}

/**
 * Generates the query parameters based on the provided options.
 *
 * @param {Object} options - Options for generating the query parameters.
 * @param {boolean} [options.includeAuthor] - Include author in the response.
 * @param {boolean} [options.includeComments] - Include comments in the response.
 * @param {boolean} [options.includeReactions] - Include reactions in the response.
 * @returns {Object} An object containing generated query parameters in key-value pairs.
 */
function generateQueryParams(options) {
    const mappings = {
        includeAuthor: '_author',
        includeComments: '_comments',
        includeReactions: '_reactions',
        tag: '_tag',
        active: '_active'
    };

    let queryParams = {};
    Object.keys(options).forEach(option => {
        if (options[option] !== null && options[option] !== undefined && mappings[option]) {
            queryParams[mappings[option]] = options[option].toString();
        }
    });

    return queryParams;
}


/**
 * Fetches all the posts based on the provided options.
 *
 * @param {Object} options - Options for fetching the posts.
 * @param {boolean} [options.includeAuthor] - Include author in the response.
 * @param {boolean} [options.includeComments] - Include comments in the response.
 * @param {boolean} [options.includeReactions] - Include reactions in the response.
 * @returns {Promise<Object[]>} An array of fetched post data.
 * @throws {Error} Throws an error if fetching fails.
 */
export async function fetchAllPosts(options = {}) {
    const queryParams = generateQueryParams(options);
    const url = buildApiUrl("social/posts", queryParams);
    const token = getToken();

    try {
        const response = await fetch(url, {

            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to fetch posts. Status: ${response.status}. Message: ${
                errorData.message || "An error occurred"
                }`
            );
        }

        const data = await response.json();
        return data;      
    } catch (error) {
        throw error;
    }
}
