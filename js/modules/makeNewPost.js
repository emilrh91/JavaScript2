import { API_BASE_URL } from "./api.js";
import { loadFeed } from "./loadFeed.js";
import { getToken } from "./fetchPosts.js";

/**
 * Sends a POST request to create a new post.
 *
 * @param {Object} data - The post data to be created.
 * @returns {Promise<Object>} The created post data.
 * @throws {Error} Throws an error if post creation fails.
 */
async function createNewPost(data) {
    const response = await fetch(`${API_BASE_URL}/social/posts`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create post. Status: ${response.status}. Message: ${errorData.message || ''}`);
    }

    return await response.json();
}

/**
 * Gathers form data and creates a new post.
 *
 * @param {Event} event - The form submission event.
 */
async function handlePostFormSubmission(event) {
    event.preventDefault();

    const title = document.getElementById('new-post-title').value;
    const body = document.getElementById('new-post-body').value;
    const tags = document.getElementById('new-post-tags').value.split(' ').map(tag => tag.trim());
    const media = document.getElementById('new-post-media').value;

    const newPostData = { title, body, tags, media };

    try {
        await createNewPost(newPostData);
        alert('Post created successfully!');
        
        loadFeed();
    } catch (error) {
        alert('Failed to create post. Please try again.');
    }
}

/**
 * Initializes the post creation form, adding an event listener for form submission.
 */
export async function initializePostCreation() {
    document.getElementById('create-post-form').addEventListener('submit', handlePostFormSubmission);
}
