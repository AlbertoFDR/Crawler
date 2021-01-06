#!/usr/bin/env node

const yargs = require("yargs");
const config = require("./lib/config");
const utils = require("./lib/utils");
const singleCrawl = require("./lib/single_crawl");
const debug = require("debug")("crawler:main");

/*********************************
 *
 * PARSE COMMAND LINE ARGUMENTS
 *
 *********************************/
const argv = yargs
    .option("URL", {
        alias: "url",
        type: "string",
        description: "The url we want to analyze.",
    })
    .option("browser", {
        alias: "b",
        type: "string",
        description: "The binary of the browser.",
    })
    .option("mode", {
        alias: "m",
        type: "integer",
        description:
            "Modes: 0 - Single crawl, 1 - RabbitMQ consumer, 2 - RabbitMQ Producer",
    })
    .option("headless", {
        type: "boolean",
        description: "Launch the browser in headless mode.",
    })
    .option("verbose", {
        alias: "v",
        type: "boolean",
        description: "Run with verbose logging",
    })
    .usage("Usage: $0 [options] URL")
    .demandOption(["URL"])
    .help()
    .alias("help", "h").argv;

// Line arguments parsing
if (!argv.URL.includes("http://") && !argv.URL.includes("https://")) {
    // TODO Add more checks for this argument
    // The code is for the red color
    console.error(
        "\x1b[31m",
        "The URL needs to be like `http://example.com/`",
        "\x1b[0m"
    );
    process.exit(1);
}

if (argv.browser) {
    config.browser = argv.browser;
}

if (argv.mode && argv.mode >= 0 && argv.mode < 3) {
    config.mode = argv.mode;
}

if (argv.headless) {
    config.headless = true;
}

if (argv.verbose) {
    config.verbose = true;

    //Print the Banner
    utils.printBanner();
}

debug("Argument parsing done..");

/*********************************
 *
 * MODES
 *
 *********************************/
switch (config.mode) {
    case 0:
        // Single crawl
        singleCrawl.execSingleCrawl(argv.url);
        break;

    case 1:
        // RabbitMQ consumer
        break;

    case 2:
        // RabbitMQ Producer
        break;
}
