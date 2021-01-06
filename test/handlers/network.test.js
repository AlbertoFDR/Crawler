/*
 * This file is the unit testing of lib/handler/crawler/network.js
 *
 * Alberto FDR
 */

const network = require("../../lib/handlers/network.js");
const resultsInit = require("../../lib/results.js");
const data = require("./network.data.js");

// Init results
results = resultsInit.initialize();

// REQUEST WILL BE SENT METHOD TEST
// 2 methods:
//      - Normal request saving all data (No loaderId)
//      - Normal request without optional data (loaderId the previous)
test("RequestWillBeSent function is going to be tested with default data", () => {
    text = network.requestWillBeSent(data.requestWillBeSent, results);
    expect(text).toBeUndefined();

    expect(results.requests[0].requestId).toBe(
        data.requestWillBeSent.requestId
    );
    expect(results.requests[0].loaderId).toBeUndefined();
    expect(results.requests[0].documentURL).toBe(
        data.requestWillBeSent.documentURL
    );
    expect(results.requests[0].request).toBe(data.requestWillBeSent.request);
    expect(results.requests[0].timestamp).toBe(
        data.requestWillBeSent.timestamp
    );
    expect(results.requests[0].wallTime).toBe(data.requestWillBeSent.wallTime);
    expect(results.requests[0].initiator).toBe(
        data.requestWillBeSent.initiator
    );
    expect(results.requests[0].redirectResponse).toBe(
        data.requestWillBeSent.redirectResponse
    );
    expect(results.requests[0].type).toBe(data.requestWillBeSent.type);
    expect(results.requests[0].frameId).toBe(data.requestWillBeSent.frameId);
    expect(results.requests[0].hasUserGesture).toBe(
        data.requestWillBeSent.hasUserGesture
    );
    expect(results.requests[0].state).toBe("Request will be sent");
});

test("RequestWillBeSent function is going to be tested without optional data", () => {
    text = network.requestWillBeSent(data.requestWillBeSent2, results);
    expect(text).toBeUndefined();

    expect(results.requests[1].loaderId).toBe(results.requests[0].requestId);
    expect(results.requests[1].redirectResponse).toBeUndefined();
    expect(results.requests[1].type).toBeUndefined();
    expect(results.requests[1].frameId).toBeUndefined();
    expect(results.requests[1].hasUserGesture).toBeUndefined();
});

// LOADING FAILED METHOD TEST
// 2 methods:
//      - Data with falses
//      - Normal function
test("HTTP loading failed function with undefined data is going to be tested", () => {
    text = network.loadingFailed(data.loadingFailed, results);
    expect(text).toBeUndefined();

    expect(results.requests[1].canceled).toBeUndefined();
    expect(results.requests[1].blockedReason).toBeUndefined();
    expect(results.requests[1].cors).toBeUndefined();
});

test("HTTP loading failed function is going to be tested", () => {
    text = network.loadingFailed(data.loadingFailed2, results);
    expect(text).toBeUndefined();

    expect(results.requests[1].state).toBe("Loading failed");
    expect(results.requests[1].type).toBe("Other");
    expect(results.requests[1].errorText).toBe(data.loadingFailed2.errorText);
    expect(results.requests[1].canceled).toBe(data.loadingFailed2.canceled);
    expect(results.requests[1].blockedReason).toBe(
        data.loadingFailed2.blockedReason
    );
    expect(results.requests[1].cors).toBe(data.loadingFailed2.cors);
});

// LOADING FINISHED METHOD TEST
// 2 methods:
//      - Data with falses searching undefined
//      - Normal data
//test("Loading finished function with undefined data is going to be tested", () => {
//    text = network.loadingFinished(data.loadingFinished, results);
//    expect(text).toBeUndefined();
//
//    expect(results.requests[0].encodedDataLength).toBe(
//        data.loadingFinished.encodedDataLength
//    );
//    expect(results.requests[0].state).toBe("Loading finished.");
//    expect(results.requests[0].shouldReportCorbBlocking).toBeUndefined();
//});

test("Loading finished function is going to be tested", () => {
    text = network.loadingFinished(data.loadingFinished2, results);
    expect(text).toBeUndefined();

    expect(results.requests[0].encodedDataLength).toBe(
        data.loadingFinished2.encodedDataLength
    );
    expect(results.requests[0].state).toBe("Loading finished.");
    expect(results.requests[0].shouldReportCorbBlocking).toBe(true);
});

// RESPONSE RECEIVED METHOD TEST
test("Response received function is going to be tested", () => {
    text = network.responseReceived(data.responseReceived, results);
    expect(text).toBeUndefined();

    expect(results.requests[0].response).toBe(data.responseReceived.response);
    expect(results.requests[0].frameId).toBe(data.responseReceived.frameId);
});

// WEB SOCKET CREATED METHOD TEST
test("Web socket created function is going to be tested", () => {
    text = network.webSocketCreated(data.webSocket2, results);
    expect(text).toBeUndefined();

    // URL comprobation
    expect(results.webSockets[0].url).toBe(data.webSocket2.url);

    // Initiator comprobation
    expect(results.webSockets[0].initiator).toBeUndefined();

    // State comprobation
    expect(results.webSockets[0].state).toBe("webSocketCreation");

    text = network.webSocketCreated(data.webSocket, results);
    expect(text).toBeUndefined();
    expect(results.webSockets[1].state).toBe("webSocketCreation");
});

// WEB SOCKET WILL SEND HANDSHAKE REQUEST METHOD TEST
test("WebSocket Will Send Handshake Request function is going to be tested", () => {
    text = network.webSocketWillSendHandshakeRequest(data.webSocket, results);
    expect(text).toBeUndefined();

    // Request Id comprobation
    expect(results.webSockets[1].requestId).toBe(data.webSocket.requestId);

    // Timestamp comprobation
    expect(results.webSockets[1].timestamp).toBe(data.webSocket.timestamp);

    // wallTime comprobation
    expect(results.webSockets[1].wallTime).toBe(data.webSocket.wallTime);

    // Request comprobation
    expect(results.webSockets[1].request.headers.Host).toBe(
        data.webSocket.request.headers.Host
    );

    // State comprobation
    expect(results.webSockets[1].state).toBe("initiateHandshake");

    // Expected 2 because of webSocketCreation test
    expect(results.webSockets.length).toBe(2);

    // Add new that is not in the []
    text = network.webSocketWillSendHandshakeRequest(data.webSocket3, results);
    expect(text).toBeUndefined();
    
    // Request Id comprobation
    expect(results.webSockets[2].requestId).toBe(data.webSocket3.requestId);

    // Timestamp comprobation
    expect(results.webSockets[2].timestamp).toBe(data.webSocket3.timestamp);

    // wallTime comprobation
    expect(results.webSockets[2].wallTime).toBe(data.webSocket3.wallTime);

    // Request comprobation
    expect(results.webSockets[2].request.headers.Host).toBe(
        data.webSocket3.request.headers.Host
    );

    // State comprobation
    expect(results.webSockets[2].state).toBe("initiateHandshake");
});

// WEB SOCKET CLOSED METHOD TEST
test("Web socket closed function is going to be tested", () => {
    text = network.webSocketClosed(data.webSocket, results);
    expect(text).toBeUndefined();

    expect(results.webSockets[1].state).toBe("Closed");
});

// WEB SOCKET FRAME ERROR METHOD TEST
test("Web socket frame error function is going to be tested", () => {
    text = network.webSocketFrameError(data.frameError, results);
    expect(text).toBeUndefined();

    // Timestamp
    expect(results.webSockets[1].frameError[0].timestamp).toBe(
        data.frameError.timestamp
    );

    // Error message
    expect(results.webSockets[1].frameError[0].errorMessage).toBe(
        data.frameError.errorMessage
    );
});

// WEB SOCKET FRAME RECEIVED METHOD TEST
test("Web socket frame received function is going to be tested", () => {
    text = network.webSocketFrameReceived(data.frame, results);
    expect(text).toBeUndefined();

    // Timestamp
    expect(results.webSockets[0].frameReceived[0].timestamp).toBe(
        data.frame.timestamp
    );

    // Response
    expect(results.webSockets[0].frameReceived[0].response.opcode).toBe(
        data.frame.response.opcode
    );


    text = network.webSocketFrameReceived(data.frame64, results);
    expect(text).toBeUndefined();

    // Timestamp
    expect(results.webSockets[2].frameReceived[0].timestamp).toBe(
        data.frame64.timestamp
    );

    // Response
    expect(results.webSockets[2].frameReceived[0].response.opcode).toBe(
        data.frame64.response.opcode
    );
});

// WEB SOCKET FRAME SENT METHOD TEST
test("Web socket frame sent function is going to be tested", () => {
    text = network.webSocketFrameSent(data.frame, results);
    expect(text).toBeUndefined();

    // Timestamp
    expect(results.webSockets[0].frameSent[0].timestamp).toBe(
        data.frame.timestamp
    );

    // Response
    expect(results.webSockets[0].frameSent[0].response.opcode).toBe(
        data.frame.response.opcode
    );

    text = network.webSocketFrameSent(data.frame64, results);
    expect(text).toBeUndefined();

    // Timestamp
    expect(results.webSockets[2].frameSent[0].timestamp).toBe(
        data.frame64.timestamp
    );

    // Response
    expect(results.webSockets[2].frameSent[0].response.opcode).toBe(
        data.frame64.response.opcode
    );
});

// WEB TRANSPORT CREATED METHOD TEST
test("Web transport created function is going to be tested", () => {
    text = network.webTransportCreated("params", "results");
    expect(text).toBeUndefined();
});

// WEB TRANSPORT CLOSED METHOD TEST
test("Web transport closed function is going to be tested", () => {
    text = network.webTransportClosed("params", "results");
    expect(text).toBeUndefined();
});
