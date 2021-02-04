const browser = require("./browser");
const utils = require("./utils");
const config = require("./config");
const results = require("./results");
const network = require("./handlers/network");
const page = require("./handlers/page");
const CDP = require("chrome-remote-interface");
const URL = require("url");
const debug = require("debug")("crawler:single_crawler");

/*
 * The method that executes the crawling of a web
 * @async
 * @exports
 */
async function execSingleCrawl(url) {
    url = URL.parse(url);

    //Initialize results
    resultsData = results.initialize(url.href);

    // ======================================= INITIALIZING BROWSER
    debug("Initialize browser");

    // If verbose, print something
    // TODO move this verboses outputs to another js.
    if (config.verbose) {
        process.stdout.write("Initialization of the browser... \r");
    }

    // Launch the browser
    await browser.launchBrowser();

    // ======================================= CREATE RESULTS DIR
    // If verbose, print something
    if (config.verbose) {
        process.stdout.write("Initialization of the browser [✔️]\r\n");
        process.stdout.write("Creating the results directories... \r");
    }

    // Create the results dir
    createResultsDir(url, resultsData);

    // ======================================= START CRAWL
    // Sleep some minutes to wait the browser initialization
    await utils.sleep(10000);
    debug("Starting the crawling");

    // If verbose, print something
    if (config.verbose) {
        process.stdout.write("Creating the results directories [✔️]\r\n");
        process.stdout.write("Starting the crawling... \r\n");
    }

    // Start crawling
    await startCrawling(url.href, resultsData);

    // If verbose, print something
    if (config.verbose) {
        process.stdout.write("Crawling done [✔️]\r\n");
    }

    // ======================================= SAVING DATA
    debug("Saving the results...");
    // If verbose, print something
    if (config.verbose) {
        process.stdout.write("Saving the results... \r");
    }

    // Call the method
    results.saveResults(resultsData);

    // If verbose, print something
    if (config.verbose) {
        process.stdout.write("Saving the results [✔️]\r\n");
    }

    // If console output
    if (config.print) {
        console.log(resultsData);
    }
}

/**
 * Starts the crawling
 * @async
 */
async function startCrawling(url, resultsData) {
    let client;
    try {
        // Connect to endpoint
        client = await CDP();
        debug("Waiting for CDP...");

        // extract domains
        const { Network, Page, Profiler } = client;

        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Profiler.enable();

        // Clean the browser
        browser.cleanBrowser(Page, Network);

        // Set various configs
        Profiler.setSamplingInterval({ interval: 100 });
        userAgent = config.userAgent;
        await Network.setUserAgentOverride({ userAgent });

        // SETTING HANDLERS
        debug("Setting the handlers");

        // Network handler
        Network.requestWillBeSent((params) => {
            network.requestWillBeSent(params, resultsData);
        });

        Network.loadingFailed((params) => {
            network.loadingFailed(params, resultsData);
        });

        Network.loadingFinished((params) => {
            network.loadingFinished(params, resultsData, Network);
        });

        Network.responseReceived((params) => {
            network.responseReceived(params, resultsData);
        });

        Network.webSocketWillSendHandshakeRequest((params) => {
            network.webSocketWillSendHandshakeRequest(params, resultsData);
        });

        // NEW API bidirectional, multiplexed network connections
        //Network.webTransportCreated((params) => {
        //    network.webTransportCreated(params, resultsData);
        //});

        //Network.webTransportClosed((params) => {
        //    network.webTransportClosed(params, resultsData);
        //});

        Network.webSocketCreated((params) => {
            network.webSocketCreated(params, resultsData);
        });

        Network.webSocketClosed((params) => {
            network.webSocketClosed(params, resultsData);
        });

        Network.webSocketFrameError((params) => {
            network.webSocketFrameError(params, resultsData);
        });

        Network.webSocketFrameReceived((params) => {
            network.webSocketFrameReceived(params, resultsData);
        });

        Network.webSocketFrameSent((params) => {
            network.webSocketFrameSent(params, resultsData);
        });

        // Page handlers
        Page.interstitialShown(() => {
            page.interstitialShown(resultsData);
        });

        Page.interstitialHidden(() => {
            page.interstitialHidden(resultsData);
        });

        Page.javascriptDialogOpening((params) => {
            page.javascriptDialogOpening(params, resultsData);
        });

        Page.javascriptDialogClosed((params) => {
            page.javascriptDialogClosed(params, resultsData);
        });

        Page.windowOpen((params) => {
            page.windowOpen(params, resultsData);
        });

        Page.loadEventFired((params) => {
            page.loadEventFired(params, resultsData);
        });

        // Starting profiler
        Profiler.start();

        // Navigate
        debug("Starting the navigation of the url");
        await Page.navigate({ url: url });

        // Do some stuff in the web like clicking or something to simulate the user

        // Sleep some minutes to wait in the web
        await utils.sleep(20000);

        // Stop profiling
        Profiler.stop();
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            debug("Closing the browser");
            await client.Browser.close();
            await client.close();
        }
    }
}

/*
 * Create the result directories.
 * @async
 * @exports
 */
async function createResultsDir(url, resultsData) {
    debug("Creating the results directories");

    let time = utils.getTime();

    // If the paths ends in / creates an error creating the dir
    let path = "";
    if (url.path.slice(-1) == "/") {
        path = url.path.slice(0, -1);
    } else {
        path = url.path;
    }

    // Check if exist results directories
    if (!utils.exists("/results")) {
        utils.createDir("/results");
    }

    // Check if exist this url analysis
    // The structure is goint to be results/hostname/path
    if (!utils.exists("/results/" + url.host)) {
        utils.createDir("/results/" + url.host);
    }

    if (url.pathname != "/") {
        if (!utils.exists("/results/" + url.host + path)) {
            // Create depending the path of the host
            utils.createDir("/results/" + url.host + path);
        }

        // Creating time folder
        utils.createDir("/results/" + url.host + path + "/" + time);

        // Save in the results
        resultsData.resultsPath = "/results/" + url.host + path + "/" + time;

        // Create the folder for the files
        utils.createDir("/results/" + url.host + path + "/" + time + "/files");
    } else {
        if (!utils.exists("/results/" + url.host + "/base")) {
            utils.createDir("/results/" + url.host + "/base");
        }

        // Creating the results data inside time folder
        utils.createDir("/results/" + url.host + "/base/" + time);

        // Save in the results
        resultsData.resultsPath = "/results/" + url.host + "/base/" + time;

        // Create the folder for the files
        utils.createDir("/results/" + url.host + "/base/" + time + "/files");
    }
}

//----------------------------------------
// Module exports
//----------------------------------------
module.exports = {
    // Method to launch basic crawl
    execSingleCrawl: execSingleCrawl,
};
