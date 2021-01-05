const fs = require("fs");
const figlet = require("figlet");

/**
 * Function to sleep the process. The main purpose is for waiting the initialization of browser.
 *
 * @param {integer} ms Milliseconds to wait
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * Function to check if a file or dir exists (Wrapper).
 *
 * @param {string} path Path to the file or dir
 */
function exists(path) {
    return fs.existsSync(process.cwd() + path);
}

/**
 * Function to create directory (Wrapper).
 *
 * @param {string} path Path to create the dir
 */
function createDir(path) {
    fs.mkdirSync(process.cwd() + path);
}

/**
 * Function to write data.
 *
 * @param {string} path Path to create the dir
 * @param {string} data The data to write
 */
function writeJSON(path, data) {
    fs.writeFileSync(process.cwd() + path, data);
}

/**
 * Function to print the banner of the Crawler.
 */
function printBanner() {
    // Fonts that I like
    let fonts = [
        "Reverse",
        "Epic",
        "3D Diagonal",
        "Puffy",
        "Swan",
        "Maxfour",
        "Crawford",
        "Small",
        "DOS Rebel",
        "Stop",
        "Stick Letters",
        "Banner4",
        "Stronger Than All",
        "Sub-Zero",
        "Georgia11",
        "Big Money-nw",
        "Doom",
        "Cosmike",
        "Chiseled",
        "Electronic",
    ];
    let font = fonts[Math.floor(Math.random() * fonts.length)];
    console.log(new Array(80).join("="));
    console.log(new Array(80).join("=") + "\n");
    console.log(
        figlet.textSync("Kankuro", {
            font: font,
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 90,
            whitespaceBreak: true,
        })
    );
    console.log("\n" + new Array(80).join("="));
    console.log(new Array(80).join("="));
}

// ------------------------------------
// Module exports
// ------------------------------------
module.exports = {
    // Sleep function
    sleep: sleep,
    // Exists function
    exists: exists,
    // Create directory function
    createDir: createDir,
    // Write JSON function
    writeJSON: writeJSON,
    // Print banner,
    printBanner: printBanner,
};
