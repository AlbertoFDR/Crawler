/*********************************
 *
 * RESULTS PARAMS
 *
 *********************************/

/**
 * Initialize the results with empty results
 *
 * @return {object} results
 */
function initialize() {
    // Create empty results
    const results = {
        // Network requests
        requests: [],
    };

    return results;
}

// ------------------------------------
// Module exports
// ------------------------------------
module.exports = {
    // Generate the results
    initialize: initialize,
};
