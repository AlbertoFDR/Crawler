const utils = require("./utils");
const fs = require("fs");

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
function initialize(url) {
    // Create empty results
    const results = {
        // URL Analyzed
        urlAnalyzed: url,

        // Time when it was executed
        crawlingTime: utils.getTime(),

        // The path to the results folder
        resultsPath: "",

        // Network requests
        requests: [],

        // Interstitial Page
        interstitial: false,

        // Javascript created dialogs (handlers/page.js)
        javascriptDialog: [],

        // WindowOpen fired when a new windows is goingo to be opened ... (handlers/page.js)
        windowOpen: [],

        // Frames of the page
        frames: [],

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
    json = JSON.stringify(resultsData);
    fs.writeFileSync(
        process.cwd() + resultsData.resultsPath + "/results.json",
        json,
        (err) => {
            if (err) throw err;
        }
    );
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
