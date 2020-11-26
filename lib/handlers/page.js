const debug = require("debug")("crawler:page");

/**
 * Fired when interstitial page was shown.
 */
function interstitialShown(params, results) {
    debug("Entering Page.interstitialShown handler");
}

/**
 * Fired when interstitial page was hidden.
 */
function interstitialHidden(params, results) {
    debug("Entering Page.interstitialHidden handler");
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
 * @param {string} params.url Whether dialog was confirmed
 * @param {string} params.windowName Window name
 * @param {array[string]} params.windowFeatures An array of enabled window features
 * @param {boolean} params.userGesture Whether or not it was triggered by user gesture.
 *
 */
function windowOpen(params, results) {
    debug("Entering Page.windowOpen handler");
}

/**
 * Load event fired
 * @param {object} params.timestamp
 *
 */
function loadEventFired(params, results) {
    debug("Entering Page.loadEventFired handler");
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
};
