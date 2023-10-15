// feed.js

import { loadFeed } from '../modules/loadFeed.js';
import { searchPosts } from '../modules/searchPosts.js';
import { filterPostsByCount } from '../modules/filterPosts.js';
import { fetchAllPosts } from "../modules/fetchPosts.js";
import { renderPosts } from "../modules/renderPosts.js";
import { initializePostCreation } from "../modules/makeNewPost.js";

/**
 * Attaches an event listener to an element with the specified ID, if it exists.
 * 
 * @param {string} elementId - The ID of the element to attach the listener to.
 * @param {string} event - The name of the event to listen for.
 * @param {Function} callback - The callback function to execute when the event occurs.
 */
function attachListenerIfElementExists(elementId, event, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener(event, callback);
    }
}


document.addEventListener('DOMContentLoaded', initializePage);

/**
 * Initializes the page content and event listeners after the DOM is loaded.
 */
function initializePage() {
    loadFeed().then(() => {
    });
    
    attachListenerIfElementExists('search-button', 'click', handleSearch);
    attachListenerIfElementExists('sort-posts', 'change', handleSort);
    attachListenerIfElementExists('filter-tags', 'change', handleFilter);
    attachListenerIfElementExists('filter-active', 'change', handleFilter);
    initializePostCreation();
}

/**
 * Handles the post search based on a query from the search input.
 */
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        const query = searchInput.value;
        fetchAllPosts({
            includeAuthor: true
        }).then(posts => {
            const filteredPosts = searchPosts(posts, query);
            renderPosts(filteredPosts);
        });
    }
}

/**
 * Handles sorting of posts based on a selected count from a dropdown.
 */
function handleSort() {
    const sortSelect = document.getElementById('sort-posts');
    if (sortSelect) {
        const selectedCount = sortSelect.value;
        fetchAllPosts().then(posts => {
            const filteredPosts = filterPostsByCount(posts, selectedCount);
            renderPosts(filteredPosts);
        });
    }
}

/**
 * Filters the displayed posts based on selected tags and active state.
 */
function handleFilter() {
    const filterTagsSelect = document.getElementById('filter-tags');
    const filterActiveCheckbox = document.getElementById('filter-active');
    if (filterTagsSelect && filterActiveCheckbox) {
        const selectedTag = filterTagsSelect.value.toLowerCase();
        const isActive = filterActiveCheckbox.checked;


        fetchAllPosts({
            tag: selectedTag !== 'all' ? selectedTag : null,
            active: isActive,
            includeAuthor: true,
            includeComments: true,
            includeReactions: true
        }).then(renderPosts);
    }
}

