/*
 * This file is the unit testing of lib/handler/crawler/page.js
 *
 * Alberto FDR
 */

const page = require("../../lib/handlers/page.js");
const resultsInit = require("../../lib/results.js");

// Init results
results = resultsInit.initialize();

// Fired when interstitial page was shown
test("interstitialShown function is going to be tested", () => {
    text = page.interstitialShown(results);
    expect(text).toBeUndefined();
    expect(results.interstitial).toBeTruthy();
});

// Fired when interstitial page was hidden
test("interstitialHidden function is going to be tested", () => {
    text = page.interstitialShown(results);
    expect(text).toBeUndefined();
    expect(results.interstitial).toBeTruthy();
});

// Fired when a JS initiated dialog is about to open
test("javascriptDialogOpening function is going to be tested", () => {
    // Data for the test
    params = {};
    params.url = "http://example.org/";
    params.message = "Example message";
    params.type = "alert";
    params.hasBrowserHandler = true;

    // Test 1
    text = page.javascriptDialogOpening(params, results);
    expect(text).toBeUndefined();
    expect(results.javascriptDialog[0].url).toBe(params.url);
    expect(results.javascriptDialog[0].message).toBe(params.message);
    expect(results.javascriptDialog[0].type).toBe(params.type);
    expect(results.javascriptDialog[0].hasBrowserHandler).toBe(
        params.hasBrowserHandler
    );
    expect(results.javascriptDialog[0].defaultPrompt).toBeUndefined;

    // Test 2
    params.defaultPrompt = "This is a text";
    text = page.javascriptDialogOpening(params, results);
    expect(text).toBeUndefined();
    expect(results.javascriptDialog[1].url).toBe(params.url);
    expect(results.javascriptDialog[1].message).toBe(params.message);
    expect(results.javascriptDialog[1].type).toBe(params.type);
    expect(results.javascriptDialog[1].hasBrowserHandler).toBe(
        params.hasBrowserHandler
    );
    expect(results.javascriptDialog[1].defaultPrompt).toBe(
        params.defaultPrompt
    );
});

// Fired when a JS initiated dialog has been closed
test("javascriptDialogOpening function is going to be tested", () => {
    text = page.javascriptDialogClosed("params", "results");
    expect(text).toBeUndefined();
});

// Fired when a new window is going to be opened, via window.open(), lick click, form submission...
test("windowOpen function is going to be tested", () => {
    params = {};
    params.url = "http://example.org";
    params.windowName = "Window name for example";
    params.windowFeatures = ["example", "of", "window", "features"];
    params.userGesture = false;

    text = page.windowOpen(params, results);
    expect(text).toBeUndefined();
    expect(results.windowOpen[0].url).toBe(params.url);
    expect(results.windowOpen[0].windowName).toBe(params.windowName);
    expect(results.windowOpen[0].windowFeatures).toBe(params.windowFeatures);
    expect(results.windowOpen[0].userGesture).toBe(params.userGesture);
});

// Load event fired
test("loadEventFired function is going to be tested", () => {
    text = page.loadEventFired("params", "results");
    expect(text).toBeUndefined();
});

// Frame navigated test
test("frameNavigated function is going to be tested", () => {
    params = {};
    params.frame = {};
    params.frame.id = "THISISANID";
    params.frame.loaderId = "LOADERID";
    params.frame.url = "http://example.org/123123";
    params.frame.securityOrigin = "https://example.org";
    params.frame.mimeType = "text/html";
    params.frame.parentId = "PARENTID"; // Optional
    params.frame.name = "Name"; // Optional

    // Test
    text = page.frameNavigated(params, results);
    expect(text).toBeUndefined();
    expect(results.frames[0].id).toBe(params.frame.id);
    expect(results.frames[0].loaderId).toBe(params.frame.loaderId);
    expect(results.frames[0].url).toBe(params.frame.url);
    expect(results.frames[0].securityOrigin).toBe(params.frame.securityOrigin);
    expect(results.frames[0].mimeType).toBe(params.frame.mimeType);
    expect(results.frames[0].parentId).toBe(params.frame.parentId);
    expect(results.frames[0].name).toBe(params.frame.name);
});

// Frame attach test
test("frameAttached function is going to be tested", () => {
    params = {};
    params.frame = {};
    params.frameId = "THISISANID";
    params.parentFrameId = "LOADERID";
    params.stack = "stack";

    // Test with same frame that previous test
    text = page.frameAttached(params, results);
    expect(text).toBeUndefined();
    expect(results.frames.length).toBe(1);

    // Test with name frame
    params.frameId = "NEWID";
    text = page.frameAttached(params, results);
    expect(text).toBeUndefined();
    expect(results.frames.length).toBe(2);
    expect(results.frames[1].id).toBe(params.frameId);
    expect(results.frames[1].parentFrameId).toBe(params.parentFrameId);
    expect(results.frames[1].stack).toBe(params.stack);
});
