/**
 * Base URL for the API.
 * @constant {string}
 */
export const API_BASE_URL = "https://api.noroff.dev/api/v1";

/**
 * Builds a complete API URL using the given endpoint and query parameters.
 *
 * @param {string} endpoint - The API endpoint.
 * @param {Object} [params={}] - An object containing query parameters in key-value pairs.
 * @returns {string} A complete URL string.
 */
export function buildApiUrl(endpoint, params = {}) {
    const queryParams = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return queryParams ? `${API_BASE_URL}/${endpoint}?${queryParams}` : `${API_BASE_URL}/${endpoint}`;
}
