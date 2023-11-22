import { loginUser } from "../modules/auth.js"

document.addEventListener("DOMContentLoaded", initializeLoginForm);

/**
 * Initializes the login form and sets up its event listener.
 */
function initializeLoginForm() {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", handleLoginFormSubmit);
}

/**
 * Handles the submission of the login form.
 * 
 * @param {Event} event - The submit event triggered.
 */
async function handleLoginFormSubmit(event) {
    event.preventDefault();

    const userCredentials = {
        email: event.target.email.value,
        password: event.target.password.value,
    };

    try {
        const response = await loginUser(userCredentials);
        processLoginResponse(response);
    } catch (error) {
        alert("Login error: " + error.message);
    }
}

/**
 * Processes the response from the login request.
 * 
 * @param {Object} response - The response object from the login request.
 */
function processLoginResponse(response) {
    if (response && response.accessToken) {
        localStorage.setItem('jwt_token', response.accessToken);

        if (response.email) {
            localStorage.setItem('user_email', response.email);
        }

        window.location.href = '../pages/feed.html';
    } else {
        alert("Login failed.");
    }
}
