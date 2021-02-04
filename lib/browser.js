const { spawn } = require("child_process");
const debug = require("debug")("crawler:browser");
const config = require("./config");

/**
 * Launch the browser in a subprocess
 * @async
 */
async function launchBrowser() {
    params = ["--remote-debugging-port=9222"];

    if (config.headless) {
        params.push("--headless");
    }

    // Launch with the desired params
    browser = spawn(config.browser, params);

    browser.on("error", (err) => {
        console.error("Failed to start subprocess with the browser.");
    });

    debug("Browser launched, pid: " + browser.pid);
}

/**
 * Clean the browser (Cache, Cookies...)
 * @async
 */
async function cleanBrowser(Page, Network) {
    // Clean the browser
    debug("Cleaning the browser");
    await Page.resetNavigationHistory();
    // await Network.clearBrowserCache(); // Fails with headless activated idk why :(
    await Network.clearBrowserCookies();
}

//----------------------------------------
// Module exports
//----------------------------------------
module.exports = {
    // Export the method to launching browser
    launchBrowser: launchBrowser,
    // Clean the browser
    cleanBrowser: cleanBrowser,
};
