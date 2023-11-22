/**
 * Generates the complete HTML structure for a post.
 * 
 * @param {Object} post - The post data.
 * @param {string} currentUserId - The ID of the current user.
 * @returns {string} The HTML string representation of the post.
 */
export function generatePostHTML(post, currentUserId) {
    return `
        <div class="card-body">
            ${postHeader(post)}
            ${postBody(post)}
            ${postTags(post.tags)}
            ${postComments(post.comments)}
            ${postReactions(post.reactions)}
            ${addCommentForm()}
            ${userManagementButtons(post, currentUserId)}
        </div>
    `;
}

/**
 * Generates the HTML header for a post.
 * 
 * @param {Object} post - The post data.
 * @returns {string} The HTML string for the post header.
 */
function postHeader(post) {
    return `
        <h1 class="post-title card-title">${post.title}</h1>
        <h3 class="post-author card-subtitle mb-2 text-muted">${post.author?.name || "Unknown Author"}</h3>
    `;
}

/**
 * Generates the HTML body for a post.
 * 
 * @param {Object} post - The post data.
 * @returns {string} The HTML string for the post body.
 */
function postBody(post) {
    return `
        <p class="post-body card-text">${post.body}</p>
        ${post.media ? `<img src="${post.media}" class="img-fluid" alt="Media content for post">` : ""}
    `;
}

/**
 * Generates the HTML content for the tags section of a post.
 * 
 * @param {Array<string>} tags - An array of tags.
 * @returns {string} The HTML string for the tags section.
 */
function postTags(tags) {
    const tagsContent = tags.map(tag => `<span class="badge bg-primary">${tag}</span>`).join(' ');
    return `
        <div class="post-tags mt-3">
            ${tagsContent}
        </div>
    `;
}

/**
 * Generates the HTML content for the reactions section of a post.
 * 
 * @param {Array<Object>} reactions - An array of reaction objects.
 * @returns {string} The HTML string for the reactions section.
 */
function postReactions(reactions) {
    const availableReactions = ["👍", "❤️", "😀", "😲", "👎"];
    return `
        <div class="reactions mt-3">
            <h4>Reactions</h4>
            <div class="reaction-counts mb-2">
                ${availableReactions.map(emoji => {
                    const reactionObj = reactions.find(r => r.symbol === emoji);
                    const count = reactionObj ? reactionObj.count : 0;
                    return `<span class="reaction mr-2">${count}${emoji}</span>`;
                }).join(" ")}
            </div>
            <div class="reaction-buttons">
                ${availableReactions.map(emoji => `
                    <button class="give-reaction btn btn-light btn-sm mr-1" data-symbol="${emoji}">${emoji}</button>
                `).join(" ")}
            </div>
        </div>
    `;
}

/**
 * Generates the HTML content for the add comment form of a post.
 * 
 * @returns {string} The HTML string for the add comment form.
 */
function addCommentForm() {
    return `
        <form class="add-comment-form mt-3">
            <div class="form-group">
                <input type="text" placeholder="Add a comment..." class="form-control new-comment-text">
            </div>
            <button type="submit" class="btn btn-primary mt-2">Add Comment</button>
        </form>
    `;
}

/**
 * Generates the HTML content for the comments section of a post.
 * 
 * @param {Array<Object>} [comments=[]] - An array of comment objects.
 * @returns {string} The HTML string for the comments section.
 */
function postComments(comments = []) {
    return `
        <div class="comments mt-3">
            <h4>Comments</h4>
            ${comments.map(comment => `
                <div class="comment card-text">${comment.body} 
                    - <span class="comment-author">${comment.author.name || "Unknown"}</span>
                </div>
            `).join("")}
        </div>
    `;
}

/**
 * Generates the HTML content for the user management buttons of a post.
 * 
 * @param {Object} post - The post data.
 * @param {string} currentUserId - The ID of the current user.
 * @returns {string} The HTML string for the user management buttons.
 */
function userManagementButtons(post, currentUserId) {
    return currentUserId === post.author?.email
        ? `
            <div class="mt-3">
                <button class="delete-post btn btn-danger mr-2" data-post-id="${post.id}">Delete</button>
                <button class="update-post btn btn-warning" data-post-id="${post.id}">Update</button>
            </div>
        `
        : '';
}

