import { fetchAllPosts } from './fetchPosts.js';
import { renderPosts } from './renderPosts.js';

/**
 * Loads and renders all posts in the feed.
 *
 * @async
 * @throws {Error} If there's an error loading the feed.
 */
export async function loadFeed() {
    try {
        const posts = await fetchAllPosts({
            includeAuthor: true,
            includeComments: true,
            includeReactions: true
        });

        renderPosts(posts);
    } catch (error) {
    }
}
