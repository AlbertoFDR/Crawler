const debug = require("debug")("crawler:network");

/**
 * Fired when page is about to send HTTP request.
 *
 * @param {object} params Received parameters from the event
 *      @param {string} params.requestId Unique request identifier.
 *      @param {string} params.loaderId Unique loader identifier.
 *      @param {string} params.documentURL URL of the document this request is loaded for.
 *      @param {object} params.request Request data.
 *      @param {object} params.timestamp Timestamp.
 *      @param {object} params.wallTime Time since epoch.
 *      @param {object} params.initiator Request initiator.
 *      @param {object} params.redirectResponse Redirect response data, OPTIONAL.
 *      @param {object} params.type Type of this resource, OPTIONAL.
 *      @param {object} params.frameId Frame identifier, OPTIONAL.
 *      @param {object} params.hasUserGesture Whether the request is initiated by a user gesture. Defaults to false, OPTIONAL.
 * @param {object} results Results object to save the data
 */
function requestWillBeSent(params, results) {
    debug("Entering Network.requestWillBeSent handler");

    // Create the Request object to save
    request = {};
    request.requestId = params.requestId;

    // If there is no loaderId it returns the requestId so we check that
    if (params.loaderId != params.requestId) {
        request.loaderId = params.loaderId;
    }

    request.documentURL = params.documentURL;
    request.request = params.request;
    request.timestamp = params.timestamp;
    request.wallTime = params.wallTime;
    request.initiator = params.initiator;

    // Check optional params
    if (params.redirectResponse != undefined) {
        request.redirectResponse = params.redirectResponse;
    }
    if (params.type != undefined) {
        request.type = params.type;
    }
    if (params.frameId != undefined) {
        request.frameId = params.frameId;
    }
    if (params.hasUserGesture != undefined) {
        request.hasUserGesture = params.hasUserGesture;
    }

    // Set request state
    request.state = "Request will be sent";

    // Save object
    results.requests.push(request);
}

/**
 * Fired when HTTP request has failed to load.
 *
 * @param {object} params Received parameters from the event
 *      @param {string} params.requestId Unique request identifier.
 *      @param {object} params.timestamp Monotonic Time.
 *      @param {object} params.type Resource type.
 *      @param {string} params.errorText User friendly error message.
 *      @param {boolean} params.canceled True if loading was canceled.
 *      @param {object} params.blockedReason The reason why loading was blocked, if any.
 *      @param {object} params.cors The reason why loading was blocked by CORS, if any.
 * @param {object} results Results object to save the data
 */
function loadingFailed(params, results) {
    debug("Entering Network.loadingFailed handler");

    for (i = 0; i < results.requests.length; i++) {
        if (params.requestId == results.requests[i].requestId) {
            // Save the type of the resource
            if (results.requests[i].type != params.type) {
                results.requests[i].type = params.type;
            }

            // Change state
            results.requests[i].state = "Loading failed";

            // Was canceled?
            if (params.canceled) {
                results.requests[i].canceled = true;
            }

            // Save error
            if (params.errorText != undefined) {
                results.requests[i].errorText = params.errorText;
            }

            // Save if it was blocked for any reason
            if (params.blockedReason != undefined) {
                results.requests[i].blockedReason = params.blockedReason;
            }

            // Save if it was CORS problem
            if (params.cors != undefined) {
                results.requests[i].cors = params.cors;
            }

            // Break the loop
            break;
        }
    }
}

/**
 * Fired when HTTP request has finished loading.
 *
 * @param {object} params Received parameters from the event
 *      @param {object} params.requestId Request identifier.
 *      @param {object} params.timestamp Monotonic Time.
 *      @param {number} params.encodedDataLength Total number of bytes received for this request.
 *      @param {boolean} params.shouldReportCorbBlocking Set when 1) response was blocked by Cross-Origin Read Blocking and also 2) this needs to be reported to the DevTools console, OPTIONAL.
 * @param {object} results Results object to save the data
 */
function loadingFinished(params, results) {
    debug("Entering Network.loadingFinished handler");

    for (i = 0; i < results.requests.length; i++) {
        if (params.requestId == results.requests[i].requestId) {
            // Save the total data
            results.requests[i].encodedDataLength = params.encodedDataLength;

            // Change the state of the request
            results.requests[i].state = "Loading finished.";

            // If corb
            if (params.shouldReportCorbBlocking) {
                results.requests[i].shouldReportCorbBlocking = true;
            }

            // Break loop
            break;
        }
    }
}

/**
 * Fired when HTTP response is available.
 *
 * @param {object} params Received parameters from the event
 *      @param {object} params.requestId Request identifier.
 *      @param {object} params.loaderId Loader identifier. Empty string if the request is fetched from worker.
 *      @param {object} params.timestamp Monotonic Time.
 *      @param {object} params.type Resource type.
 *      @param {object} params.response Response data.
 *      @param {object} params.frameId Frame identifier.
 * @param {object} results Results object to save the data
 */
function responseReceived(params, results) {
    debug("Entering Network.responseReceived handler");

    for (i = 0; i < results.requests.length; i++) {
        if (params.requestId == results.requests[i].requestId) {
            // Save response
            results.requests[i].response = params.response;

            // Save frame id
            results.requests[i].frameId = params.frameId;

            // Break loop
            break;
        }
    }
}

/**
 * Fired when WebSocket is about to initiate handshake.
 *
 * @param {object} params Received parameters from the event
 *      @param {object} params.requestId Request identifier.
 *      @param {object} params.timestamp Monotonic Time.
 *      @param {object} params.wallTime Time since epoch.
 *      @param {object} params.request WebSocket request data.
 * @param {object} results Results object to save the data
 */
function webSocketWillSendHandshakeRequest(params, results) {
    debug("Entering Network.webSocketWillSendHandshakeRequest handler");
}

/**
 * Fired upon WebSocket creation.
 *
 * @param {object} params Received parameters from the event
 *      @param {object} params.requestId Request identifier.
 *      @param {string} params.url WebSocket request URL.
 *      @param {object} params.initiator Request initiator, OPTIONAL.
 * @param {object} results Results object to save the data
 */
function webSocketCreated(params, results) {
    debug("Entering Network.webSocketCreated handler");
}

/**
 * Fired when WebSocket message error occurs.
 *
 * @param {object} params Received parameters from the event
 *      @param {object} params.requestId Request identifier.
 *      @param {object} params.timestamp Monotonic Time.
 *      @param {string} params.errorMessage WebSocket error message.
 * @param {object} results Results object to save the data
 */
function webSocketFrameError(params, results) {
    debug("Entering Network.webSocketFrameError handler");
}

/**
 * Fired when WebSocket message is received.
 *
 * @param {object} params Received parameters from the event
 *      @param {object} params.requestId Request identifier.
 *      @param {object} params.timestamp Monotonic Time.
 *      @param {string} params.response WebSocket response data.
 * @param {object} results Results object to save the data
 */
function webSocketFrameReceived(params, results) {
    debug("Entering Network.webSocketFrameReceived handler");
}

/**
 * Fired when WebSocket message is sent.
 *
 * @param {object} params Received parameters from the event
 *      @param {object} params.requestId Request identifier.
 *      @param {object} params.timestamp Monotonic Time.
 *      @param {string} params.response WebSocket response data.
 * @param {object} results Results object to save the data
 */
function webSocketFrameSent(params, results) {
    debug("Entering Network.webSocketFrameSent handler");
}

//----------------------------------------
// Module exports
//----------------------------------------
module.exports = {
    // Request will be sent method
    requestWillBeSent: requestWillBeSent,

    // Loading failed method
    loadingFailed: loadingFailed,

    // Loading finished method
    loadingFinished: loadingFinished,

    // Response received method
    responseReceived: responseReceived,

    // WebSocket will send handshake request method
    webSocketWillSendHandshakeRequest: webSocketWillSendHandshakeRequest,

    // WebSocket is going to be created method
    webSocketCreated: webSocketCreated,

    // WebSocket frame error method
    webSocketFrameError: webSocketFrameError,

    // WebSocket frame received method
    webSocketFrameReceived: webSocketFrameReceived,

    // WebSocket frame sent method
    webSocketFrameSent: webSocketFrameSent,
};
