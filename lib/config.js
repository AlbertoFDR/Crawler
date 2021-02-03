/*********************************
 *
 * CONFIG PARAMS
 *
 *********************************/

var config = {};

config.browser = "chromium";
config.userAgent =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36";
config.mode = 0;
config.headless = true;
config.verbose = false;

// Possible values: Document, Stylesheet, Image, Media, Font, Script, TextTrack, XHR, Fetch, EventSource, WebSocket, Manifest, SignedExchange, Ping, CSPViolationReport, Preflight, Other
config.filesToDownload = [
    "Document",
    "Stylesheet",
    "Script",
    "TextTrack",
    "Fetch",
    "WebSocket",
    "Manifest",
    "SignedExchange",
    "Ping",
    "CSPViolationReport",
    "Preflight",
    "Other",
];

module.exports = config;
