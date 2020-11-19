#!/usr/bin/env node

const yargs = require('yargs');
const config = require('./lib/config');
const singleCrawl = require('./lib/single_crawl');
const debug = require("debug")("crawler:main");



/*********************************
 *
 * PARSE COMMAND LINE ARGUMENTS
 *
 *********************************/
const argv = yargs
  .option('URL', {
    alias: 'url',
    type: 'string',
    description: 'The url we want to analyze.'
  })
  .option('browser', {
    alias: 'b',
    type: 'string',
    description: 'The binary of the browser.'
  })
  .option('mode', {
    alias: 'm',
    type: 'integer',
    description: 'Modes: 0 - Single crawl, 1 - RabbitMQ consumer, 2 - RabbitMQ Producer'
  })
  .option('verbose', {
    alias: 'v',
    alias: 'verbose',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .usage('Usage: $0 [options] URL')
  .demandOption(['URL'])
  .help()
  .alias('help', 'h')
  .argv


if(argv.browser){
   config.browser = argv.browser; 
}

if(argv.mode && argv.mode >= 0 && argv.mode < 3){
   config.mode = argv.mode; 
}

debug("Argument parsing done..");

/*********************************
 *
 * MODES
 *
 *********************************/
switch (config.mode){
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

