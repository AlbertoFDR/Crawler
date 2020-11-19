/*
 * This file is the unit testing of lib/handler/crawler/network.js
 *
 * Alberto FDR
 */

const network = require("../../lib/handlers/network.js");

// REQUEST WILL BE SENT METHOD TEST
test("RequestWillBeSent function is going to be tested", () => {
    text = network.requestWillBeSent("params", "results");
    expect(text).toBeUndefined();
});

// LOADING FAILED METHOD TEST
test("HTTP loading failed function is going to be tested", () => {
    text = network.loadingFailed("params", "results");
    expect(text).toBeUndefined();
});

// LOADING FINISHED METHOD TEST
test("Loading finished function is going to be tested", () => {
    text = network.loadingFinished("params", "results");
    expect(text).toBeUndefined();
});

// RESPONSE RECEIVED METHOD TEST
test("Response received function is going to be tested", () => {
    text = network.responseReceived("params", "results");
    expect(text).toBeUndefined();
});

// WEB SOCKET WILL SEND HANDSHAKE REQUEST METHOD TEST
test("WebSocket Will Send Handshake Request function is going to be tested", () => {
    text = network.webSocketWillSendHandshakeRequest("params", "results");
    expect(text).toBeUndefined();
});

// WEB SOCKET CREATED METHOD TEST
test("Web socket created function is going to be tested", () => {
    text = network.webSocketCreated("params", "results");
    expect(text).toBeUndefined();
});

// WEB SOCKET FRAME ERROR METHOD TEST
test("Web socket frame error function is going to be tested", () => {
    text = network.webSocketFrameError("params", "results");
    expect(text).toBeUndefined();
});

// WEB SOCKET FRAME RECEIVED METHOD TEST
test("Web socket frame received function is going to be tested", () => {
    text = network.webSocketFrameReceived("params", "results");
    expect(text).toBeUndefined();
});

// WEB SOCKET FRAME SENT METHOD TEST
test("Web socket frame sent function is going to be tested", () => {
    text = network.webSocketFrameSent("params", "results");
    expect(text).toBeUndefined();
});
