const browser = require("./browser");
const utils = require("./utils");
const config = require("./config");
const results = require("./results");
const network = require("./handlers/network");
const page = require("./handlers/page");
const CDP = require("chrome-remote-interface");
const debug = require("debug")("crawler:single_crawler");

/*
 * The method that executes the crawling of a web
 * @async
 * @exports
 */
async function execSingleCrawl(url) {
    debug("Initialize browser");
    // Launch the browser
    await browser.launchBrowser();

    // Sleep some minutes to wait the browser initialization
    await utils.sleep(10000);
    debug("Starting the crawling");

    // Start crawling
    startCrawling(url);
}

/**
 * Starts the crawling
 * @async
 */
async function startCrawling(url) {
    //Initialize results
    resultsData = results.initialize();

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
        debug("Cleaning the browser");
        await Page.resetNavigationHistory();
        await Network.clearBrowserCache();
        await Network.clearBrowserCookies();

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
            network.loadingFinished(params, resultsData);
        });

        Network.responseReceived((params) => {
            network.responseReceived(params, resultsData);
        });

        Network.webSocketWillSendHandshakeRequest((params) => {
            network.webSocketWillBeSendHandshakeRequest(params, resultsData);
        });

        Network.webSocketCreated((params) => {
            network.webSocketCreated(params, resultsData);
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
        Page.interstitialShown((params) => {
            page.interstitialShown(params, resultsData);
        });

        Page.interstitialHidden((params) => {
            page.interstitialHidden(params, resultsData);
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
        await utils.sleep(10000);

        // Stop profiling
        Profiler.stop();
        console.log(resultsData.requests[0].response);
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

//----------------------------------------
// Module exports
//----------------------------------------
module.exports = {
    // Method to launch basic crawl
    execSingleCrawl: execSingleCrawl,
};
