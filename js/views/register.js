import { registerUser } from "../modules/auth.js"

document.addEventListener("DOMContentLoaded", initializeRegistrationForm);

/**
 * Initializes the registration form by attaching event listeners.
 */
function initializeRegistrationForm() {
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", handleRegistration);
}

/**
 * Handles the registration form submission.
 * 
 * @param {Event} event - The submit event triggered.
 */
async function handleRegistration(event) {
    event.preventDefault();

    const userData = extractUserDataFromForm(event.target);

    if (!isValidEmailDomain(userData.email)) {
        alert("Only emails with @noroff.no or @stud.noroff.no domains are allowed.");
        return;
    }

    try {
        await registerUser(userData);
        alert("Registered successfully!");
        redirectToLogin();
    } catch (error) {
        handleRegistrationError(error, userData);
    }
}

/**
 * Extracts user data from a registration form.
 * 
 * @param {HTMLFormElement} form - The form element.
 * @returns {Object} - An object containing user data.
 */
function extractUserDataFromForm(form) {
    return {
        name: form.username.value,
        email: form.email.value,
        password: form.password.value,
    };
}

/**
 * Checks if the provided email has a valid domain.
 * 
 * @param {string} email - The email to validate.
 * @returns {boolean} - True if the email domain is valid, false otherwise.
 */
function isValidEmailDomain(email) {
    return /@(noroff\.no|stud\.noroff\.no)$/.test(email);
}

/**
 * Redirects the user to the login page.
 */
function redirectToLogin() {
    window.location.href = "../../../JavaScript2/pages/login.html";
}

/**
 * Handles errors that occur during registration.
 * 
 * @param {Error} error - The error object.
 * @param {Object} userData - The user data that caused the error.
 */
function handleRegistrationError(error) {
    alert("Registration failed: " + error.message);
}
