/**
 * Retrieves the current user's email ID from local storage.
 *
 * @returns {string} The email ID of the logged-in user.
 * @throws {Error} If the user is not logged in (i.e., email is not present in local storage).
 */
export function getCurrentUserId() {
    const userEmail = localStorage.getItem('user_email');

    if (!userEmail) {
        throw new Error('User is not logged in');
    }
    
    return userEmail; 
}
