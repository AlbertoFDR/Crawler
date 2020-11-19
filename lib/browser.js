const { spawn } = require('child_process');
const debug = require("debug")("crawler:browser");
const config = require('./config');


/**
 * Launch the browser in a subprocess 
 * @async
 * @exports
 */
async function launchBrowser(){
    browser = spawn(config.browser, [' --remote-debugging-port=9222']);
    
    browser.on('error', (err) => {
        console.error('Failed to start subprocess with the browser.');
    });
    
    debug("Browser launched, pid: " + browser.pid);
}

//----------------------------------------
// Module exports
//----------------------------------------
module.exports = {
    
    // Export the method to launching browser
    launchBrowser: launchBrowser,

};

