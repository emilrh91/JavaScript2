/**
 * Searches for posts that match the given query in their title or body.
 * 
 * @param {Array<Object>} posts - An array of post objects to search through.
 * Each post object can have title and body properties.
 * @param {string} query - The search string to match against post titles and bodies.
 * @returns {Array<Object>} - An array of post objects that match the search query.
 */
export function searchPosts(posts, query) {
  const normalizedQuery = query.toLowerCase();

  return posts.filter(post => {
      const title = post.title?.toLowerCase() || '';
      const body = post.body?.toLowerCase() || '';
      const author = post.author?.name?.toLowerCase() || '';
      const tags = post.tags.join(' ').toLowerCase();

      return title.includes(normalizedQuery) 
          || body.includes(normalizedQuery)
          || author.includes(normalizedQuery) 
          || tags.includes(normalizedQuery);
  });
}
