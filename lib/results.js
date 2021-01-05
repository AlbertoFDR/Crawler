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

        // Web Sockets
        webSockets: [],

        // Web Transport
        webTransport: [],
    };

    return results;
}

/**
 * Save the results
 *
 * @params results
 */
function save(resultsData) {
    

}

// ------------------------------------
// Module exports
// ------------------------------------
module.exports = {
    // Generate the results
    initialize: initialize,
    // Save the results
    saveResults: save,
};
