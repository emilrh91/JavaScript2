/**
 * Filters the posts based on the provided count.
 *
 * @param {Object[]} posts - An array of post objects.
 * @param {string|number} selectedCount - Desired count of posts to retrieve. If 'all', all posts are returned.
 * @returns {Object[]} An array of filtered post objects.
 */
export function filterPostsByCount(posts, selectedCount) {
  return selectedCount === 'all' 
      ? posts 
      : posts.slice(0, parseInt(selectedCount, 10));
}

