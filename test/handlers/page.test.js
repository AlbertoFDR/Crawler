/*
 * This file is the unit testing of lib/handler/crawler/page.js
 *
 * Alberto FDR
 */

const page = require("../../lib/handlers/page.js");

// Fired when interstitial page was shown
test("interstitialShown function is going to be tested", () => {
    text = page.interstitialShown("params", "results");
    expect(text).toBeUndefined();
});

// Fired when interstitial page was hidden
test("interstitialHidden function is going to be tested", () => {
    text = page.interstitialShown("params", "results");
    expect(text).toBeUndefined();
});

// Fired when a JS initiated dialog is about to open
test("javascriptDialogOpening function is going to be tested", () => {
    text = page.javascriptDialogOpening("params", "results");
    expect(text).toBeUndefined();
});

// Fired when a JS initiated dialog has been closed
test("javascriptDialogOpening function is going to be tested", () => {
    text = page.javascriptDialogOpening("params", "results");
    expect(text).toBeUndefined();
});

// Fired when a new window is going to be opened, via window.open(), lick click, form submission...
test("windowOpen function is going to be tested", () => {
    text = page.windowOpen("params", "results");
    expect(text).toBeUndefined();
});

// Load event fired
test("loadEventFired function is going to be tested", () => {
    text = page.loadEventFired("params", "results");
    expect(text).toBeUndefined();
});
