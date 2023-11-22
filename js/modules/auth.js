import { API_BASE_URL } from "./api.js";

/**
 * Registers a new user.
 *
 * @param {Object} data - An object containing user registration data.
 * @returns {Promise<Object>} The response data from the server.
 * @throws {Error} Throws an error if the registration fails.
 */
export async function registerUser(data) {
    return sendAuthRequest(`${API_BASE_URL}/social/auth/register`, data);
}

/**
 * Logs in a user.
 *
 * @param {Object} data - An object containing user login data.
 * @returns {Promise<Object>} The response data from the server.
 * @throws {Error} Throws an error if the login fails.
 */
export async function loginUser(data) {
    return sendAuthRequest(`${API_BASE_URL}/social/auth/login`, data);
}

/**
 * Sends an authentication request.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} data - The data to send in the request.
 * @returns {Promise<Object>} The response data from the server.
 * @throws {Error} Throws an error if the request fails.
 */
async function sendAuthRequest(url, data) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Authentication failed");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}
