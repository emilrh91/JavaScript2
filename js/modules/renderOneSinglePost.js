import { attachDeleteListener } from "./deletePost.js";
import { getCurrentUserId } from "./getCurrentUserId.js";
import { attachUpdateListener } from "./updatePost.js";
import { attachCommentSubmission } from "./addCommentToPost.js";
import { reactToPost } from "./reactToPost.js"
import { createPostDiv } from "./createPostDiv.js"

/**
 * Renders a list of posts into the #post-container element.
 * 
 * @param {Array<Object>} posts - An array of post objects to be rendered.
 */
export async function renderOneSinglePost(posts) {
    const postsContainer = document.getElementById("post-container");
    postsContainer.innerHTML = "";
    postsContainer.classList.add("container");  
    
    const currentUserId = await getCurrentUserId();
    posts.forEach((post) => {
        const postDiv = createPostDiv(post, currentUserId);
        postsContainer.appendChild(postDiv);
        attachEventListeners(postDiv, post, currentUserId);
    });
}


/**
 * Attaches event listeners to various elements within a post div.
 * @param {HTMLElement} postDiv - The DOM element representing a post.
 * @param {Object} post - The post data.
 * @param {string} currentUserId - The ID of the current user.
 */
function attachEventListeners(postDiv, post, currentUserId) {
    attachCommentSubmission(postDiv, post.id);
    attachReactionListeners(postDiv, post.id, post.reactions);
    
    if (currentUserId === post.author?.email) {
        attachDeleteListener(postDiv, post.id, postDiv);
        attachUpdateListener(postDiv, post);
    }
}

/**
 * Attaches reaction event listeners to the reaction buttons within a post div.
 * @param {HTMLElement} postDiv - The DOM element representing a post.
 * @param {string} postId - The ID of the post.
 * @param {Array<Object>} reactions - An array of reaction objects.
 */
function attachReactionListeners(postDiv, postId, reactions) {
    const reactionButtons = postDiv.querySelectorAll(".give-reaction");
    reactionButtons.forEach((button) => {
        button.addEventListener("click", async function (e) {
            const reactionSymbol = e.target.getAttribute("data-symbol");
            try {
                const updatedReaction = await reactToPost(postId, reactionSymbol);
                const existingReaction = reactions.find(r => r.symbol === reactionSymbol);
                if (existingReaction) {
                    existingReaction.count = updatedReaction.count;
                } else {
                    reactions.push(updatedReaction);
                }

                const reactionsDiv = postDiv.querySelector(".reactions");
                reactionsDiv.innerHTML = postReactions(reactions);
            } catch (error) {
                alert("Error reacting to the post. Please try again.");
            }
        });
    });
}


