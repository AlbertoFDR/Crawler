const fs = require("fs");
const figlet = require("figlet");

/**
 * Function to sleep the process. The main purpose is for waiting the initialization of browser.
 *
 * @param {integer} ms Milliseconds to wait
 * @returns {Promise} Returns a Promise to wait the seconds.
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
 * @returns {Boolean} Return a True if exists and False if not.
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
    fs.mkdirSync(process.cwd() + path, { recursive: true });
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
 * Function return the date.
 *
 * @returns {string} The time. Returns in format YYYY-MM-DD.HH:MM
 */
function getTime() {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    // Returns in format YYYY-MM-DD.HH:MM
    return year + "-" + month + "-" + date + "." + hours + ":" + minutes;
}

/**
 * Function to print the banner of the Crawler. Only if the verbose is activated.
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

    // Print inside equals
    console.log(new Array(90).join("="));
    console.log(new Array(90).join("-"));
    console.log(new Array(90).join("=") + "\n");
    //Print Banner
    console.log(
        figlet.textSync("Kankuro", {
            font: font,
            horizontalLayout: "controlled smushing",
            verticalLayout: "default",
            width: 90,
            whitespaceBreak: true,
        })
    );
    console.log("\n" + new Array(90).join("="));
    console.log(new Array(90).join("-"));
    console.log(new Array(90).join("="));
}

/**
 * Take screenshot.
 *
 * @param {Object} page Page object to take the screenshot.
 * @param {Object} results Results to know the path.
 */
async function captureScreenshot(Page, results) {
    let photo = await Page.captureScreenshot();
    photo = photo.data.replace(/^data:image\/png;base64,/, "");
    path = process.cwd() + results.resultsPath + "/screenshot.png";
    console.log(path);
    fs.writeFile(path, photo, { encoding: "base64" }, function (err) {
        if (err) {
            return console.log(err);
        }
    });
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

    // Get time
    getTime: getTime,

    // Print banner
    printBanner: printBanner,

    // Capture screenshot
    captureScreenshot: captureScreenshot,
};
