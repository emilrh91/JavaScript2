import { getToken } from "./fetchPosts.js";
import { API_BASE_URL } from "./api.js";

/**
 * Sends a request to update the specified post.
 * 
 * @param {string} postId - The ID of the post to update.
 * @param {Object} updatedData - Object containing updated post data.
 * @returns {Promise<Object>} - The updated post data.
 * @throws {Error} If updating the post fails.
 */
export async function updatePost(postId, updatedData) {
    const token = await getToken();
    const url = `${API_BASE_URL}/social/posts/${postId}`;
    
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
    });
    
    if (!response.ok) {
        throw new Error('Failed to update post');
    }

    return response.json();
}

/**
 * Generates an update form for a given post.
 * 
 * @param {Object} post - The post object for which the form will be generated.
 * @returns {string} - The HTML string for the update form.
 */
export function generateUpdateFormHTML(post) {
    return `
        <div class="card mb-3"> 
            <div class="card-body">
                <form class="mb-3">
                    <input value="${post.title}" class="form-control mb-2">
                    <textarea class="form-control mb-2">${post.body}</textarea>
                    <button class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    `;
}

/**
 * Attaches an update listener to the post's update button.
 * 
 * @param {HTMLDivElement} postDiv - The post's container div.
 * @param {Object} post - The post object.
 */
export function attachUpdateListener(postDiv, post) {
    const updateButton = postDiv.querySelector('.update-post');
    
    updateButton.addEventListener("click", function () {
        const updateFormContainer = document.createElement('div');
        updateFormContainer.innerHTML = generateUpdateFormHTML(post);
        const updateForm = updateFormContainer.querySelector('form');
        
        document.body.appendChild(updateForm);

        updateForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const updatedTitle = updateForm.querySelector("input").value;
            const updatedBody = updateForm.querySelector("textarea").value;

            try {
                await updatePost(post.id, { title: updatedTitle, body: updatedBody });
                alert("Post updated successfully!");
                postDiv.querySelector(".post-title").innerText = updatedTitle;
                postDiv.querySelector(".post-body").innerText = updatedBody;
                document.body.removeChild(updateForm);
            } catch (error) {
                alert("Error updating the post. Please try again.");
            }
        });
    });
}
