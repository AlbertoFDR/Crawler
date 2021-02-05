const debug = require("debug")("crawler:page");

/**
 * Fired when interstitial page was shown.
 */
function interstitialShown(results) {
    debug("Entering Page.interstitialShown handler");
    results.interstitial = true;
}

/**
 * Fired when interstitial page was hidden.
 */
function interstitialHidden(results) {
    debug("Entering Page.interstitialHidden handler");
    results.interstitial = true;
}

/**
 * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to open.
 *
 * @param {string} params.url Frame url.
 * @param {string} params.message Message that will be displayed by the dialog.
 * @param {object} params.type Dialog type.
 *      @param {string} params.type.DialogType JS dialog type (alert, confirm, prompt, beforeunload).
 * @param {boolean} params.hasBrowserHandler True if browser is capable showing or acting on the given dialog. When browser has no dialog handler for given target, calling alert while Page domain is engaged will stall the page execution. Execution can be resumed via calling Page.handleJavaScriptDialog.
 * @param {string} params.defaultPrompt Default dialog prompt
 */
function javascriptDialogOpening(params, results) {
    debug("Entering Page.javascriptDialogOpening handler");
    let frame = {};
    frame.url = params.url;
    frame.message = params.message;
    frame.type = params.type;
    frame.hasBrowserHandler = params.hasBrowserHandler;

    if (params.defaultPrompt) {
        frame.defaultPrompt = params.defaultPrompt;
    }

    results.javascriptDialog.push(frame);
}

/**
 * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been closed.
 *
 * @param {boolean} params.result Whether dialog was confirmed
 * @param {string} params.userInput User input in case of prompt
 */
function javascriptDialogClosed(params, results) {
    debug("Entering Page.javascriptDialogClosed handler");
}

/**
 * Fired when a new window is going to be opened, via window.open(), link click, form submission, etc.
 *
 * @param {string} params.url The URL for the new window
 * @param {string} params.windowName Window name
 * @param {string[]} params.windowFeatures An array of enabled window features
 * @param {boolean} params.userGesture Whether or not it was triggered by user gesture.
 *
 */
function windowOpen(params, results) {
    debug("Entering Page.windowOpen handler");
    let windowOpen = {};

    windowOpen.url = params.url;
    windowOpen.windowName = params.windowName;
    windowOpen.windowFeatures = params.windowFeatures;
    windowOpen.userGesture = params.userGesture;

    results.windowOpen.push(windowOpen);
}

/**
 * Load event fired
 * @param {object} params.timestamp
 *
 */
function loadEventFired(params, results) {
    debug("Entering Page.loadEventFired handler");
}

/**
 * Fired once navigation of the frame has completed. Frame is now associated with the new loader.
 * @param {object} params.frame Frame object (id..)
 *
 */
function frameNavigated(params, results) {
    debug("Entering Page.frameNavigated handler");

    // Check if the frame exists in the list
    let exists = false;
    for (let i = 0; i < results.frames.length - 1; i++) {
        if (results.frames[i].id == params.frame.id) {
            exists = true;
        }
    }

    if (!exists) {
        results.frames.push(params.frame);
    }
}

/**
 * Fired when frame has been attached to its parent.
 * @param {string} params.frameId Id of the frame that has been attached.
 * @param {string} params.parentFrameId Parent frame identifier.
 * @param {string} params.stack JavaScript stack trace of when frame was attached, only set if frame initiated from script. OPTIONAL.
 *
 */
function frameAttached(params, results) {
    debug("Entering Page.frameAttached handler");
    // Check if the frame exists in the list
    let exists = false;
    for (let i = 0; i < results.frames.length; i++) {
        if (results.frames[i].id == params.frameId) {
            exists = true;
        }
    }

    if (!exists) {
        frame = {};
        frame.id = params.frameId;
        frame.parentFrameId = params.parentFrameId;
        if (params.stack) {
            frame.stack = params.stack;
        }
        results.frames.push(frame);
    }
}

//----------------------------------------
// Module exports
//----------------------------------------
module.exports = {
    // Interstitial shown handler
    interstitialShown: interstitialShown,

    // Interstitial shown handler
    interstitialHidden: interstitialHidden,

    // JS Dialog opening
    javascriptDialogOpening: javascriptDialogOpening,

    // JS Dialog closed
    javascriptDialogClosed: javascriptDialogClosed,

    // Window open
    windowOpen: windowOpen,

    // Load event fired
    loadEventFired: loadEventFired,

    // Frame navigated
    frameNavigated: frameNavigated,

    // Frame attached
    frameAttached: frameAttached,
};
