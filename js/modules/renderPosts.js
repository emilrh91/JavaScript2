/**
 * Renders a list of posts inside the 'posts-container' DOM element.
 * 
 * @param {Array<Object>} posts - An array of post objects to render. 
 * Each post object can have title, author, body, media, and tags properties.
 */
export function renderPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postDiv = createPostDiv(post);
        postsContainer.appendChild(postDiv);
    });
}

/**
 * Creates a div element for a given post with its details.
 * 
 * @param {Object} post - The post object with potential properties: title, author, body, media, tags.
 * @returns {HTMLElement} - The created div element representing the post.
 */
function createPostDiv(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post', 'card', 'mb-3');

    const authorName = post.author ? post.author.name : 'Unknown Author';
    const bodyContent = post.body;
    const mediaContent = post.media ? `<img src="${post.media}" alt="Media content for post" class="card-img-top">` : '';
    const tagsContent = post.tags.map(tag => `<span class="badge bg-primary">${tag}</span>`).join(' ');

    postDiv.innerHTML = `
        <a href="../pages/viewPost.html?id=${post.id}" class="text-decoration-none text-dark">
            <div class="card-body">
                <h5 class="card-title post-title">${post.title}</h5>
                <p class="card-text post-author"><small class="text-muted">${authorName}</small></p>
                <p class="card-text post-body">${bodyContent}</p>
                ${mediaContent}
                <div class="mt-2 post-tags">${tagsContent}</div>
            </div>
        </a>
    `;

    return postDiv;
}
