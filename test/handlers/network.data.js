/*
 * Data to test the network functions
 *
 * Alberto FDR
 */

// **************************************************************
//                INITIALIZE DATA FOR TESTS
// **************************************************************

// REQUEST WILL BE SENT DATA TESTING
requestWillBeSent = {
    requestId: "1E13F7D426495AE431DFD5615AAD2834", // String
    loaderId: "1E13F7D426495AE431DFD5615AAD2834", // String
    documentURL: "https://albertofdr.github.io/", // String
    request: {
        url: "https://albertofdr.github.io/",
        method: "GET",
        headers: {
            "Upgrade-Insecure-Requests": "1",
            "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36",
        },
        mixedContentType: "none",
        initialPriority: "VeryHigh",
        referrerPolicy: "no-referrer-when-downgrade",
    }, // Object
    timestamp: 252560.530496, // Object
    wallTime: 1606420497.090453, // Object
    initiator: { type: "other" }, // Object
    redirectResponse: "", // Object OPTIONAL
    type: "Document", // Object OPTIONAL
    frameId: "28807CCE21DED25A728599CE423DDC7F", // Object OPTIONAL
    hasUserGesture: false, // Object OPTIONAL
};
requestWillBeSent2 = {
    requestId: "2F49DFB0B7D08F8EF77CF8E2B44B16EE", // String
    loaderId: "1E13F7D426495AE431DFD5615AAD2834", // String
    documentURL: "https://albertofdr.github.io/", // String
    request: {
        url: "https://albertofdr.github.io/",
        method: "GET",
        headers: {
            "Upgrade-Insecure-Requests": "1",
            "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36",
        },
        mixedContentType: "none",
        initialPriority: "VeryHigh",
        referrerPolicy: "no-referrer-when-downgrade",
    }, // Object
    timestamp: 252560.530496, // Object
    wallTime: 1606420497.090453, // Object
    initiator: { type: "other" }, // Object
    //redirectResponse: "", // Object OPTIONAL
    //type: "Document", // Object OPTIONAL
    //frameId: "28807CCE21DED25A728599CE423DDC7F", // Object OPTIONAL
    //hasUserGesture: false, // Object OPTIONAL
};

// LOADING FAILED DATA TESTING
loadingFailed = {
    requestId: "2F49DFB0B7D08F8EF77CF8E2B44B16EE", // String
    type: "Other", // Object
    errorText: "ErrorText", // String
    canceled: false, // Boolean
    //blockedReason: "reason", // Object   OPTIONAL
    //cors: "cors", // Object OPTIONAL
};

loadingFailed2 = {
    requestId: "2F49DFB0B7D08F8EF77CF8E2B44B16EE", // String
    type: "Other", // Object
    errorText: "ErrorText", // String
    canceled: true, // Boolean
    blockedReason: "reason", // Object   OPTIONAL
    cors: "cors", // Object OPTIONAL
};

// LOADING FINISHED DATA TESTING
loadingFinished = {
    requestId: "1E13F7D426495AE431DFD5615AAD2834", // String
    timestamp: 12345,
    encodedDataLength: 12345,
    shouldReportCorbBlocking: false,
};

loadingFinished2 = {
    requestId: "1E13F7D426495AE431DFD5615AAD2834", // String
    timestamp: 12345,
    encodedDataLength: 12345,
    shouldReportCorbBlocking: true,
};

// RESPONSE RECEIVED DATA TESTING
responseReceived = {
    requestId: "1E13F7D426495AE431DFD5615AAD2834",
    response: {
        url: "http://example.org/",
        status: 200,
        statusText: "OK",
        headers: {
            "Content-Encoding": "gzip",
            "Accept-Ranges": "bytes",
            Age: "23117",
            "Cache-Control": "max-age=604800",
            "Content-Type": "text/html; charset=UTF-8",
            Date: "Thu, 26 Nov 2020 20:01:54 GMT",
            Etag: '"3147526947"',
            Expires: "Thu, 03 Dec 2020 20:01:54 GMT",
            "Last-Modified": "Thu, 17 Oct 2019 07:18:26 GMT",
            Server: "ECS (dcb/7EEE)",
            Vary: "Accept-Encoding",
            "X-Cache": "HIT",
            "Content-Length": "648",
        },
        headersText:
            "HTTP/1.1 200 OK\r\n" +
            "Content-Encoding: gzip\r\n" +
            "Accept-Ranges: bytes\r\n" +
            "Age: 23117\r\n" +
            "Cache-Control: max-age=604800\r\n" +
            "Content-Type: text/html; charset=UTF-8\r\n" +
            "Date: Thu, 26 Nov 2020 20:01:54 GMT\r\n" +
            'Etag: "3147526947"\r\n' +
            "Expires: Thu, 03 Dec 2020 20:01:54 GMT\r\n" +
            "Last-Modified: Thu, 17 Oct 2019 07:18:26 GMT\r\n" +
            "Server: ECS (dcb/7EEE)\r\n" +
            "Vary: Accept-Encoding\r\n" +
            "X-Cache: HIT\r\n" +
            "Content-Length: 648\r\n" +
            "\r\n",
        mimeType: "text/html",
        requestHeaders: {
            Host: "example.org",
            Connection: "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36",
            Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-US,en;q=0.9",
        },
        requestHeadersText:
            "GET / HTTP/1.1\r\n" +
            "Host: example.org\r\n" +
            "Connection: keep-alive\r\n" +
            "Upgrade-Insecure-Requests: 1\r\n" +
            "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36\r\n" +
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\n" +
            "Accept-Encoding: gzip, deflate\r\n" +
            "Accept-Language: en-US,en;q=0.9\r\n",
        connectionReused: false,
        connectionId: 136,
        remoteIPAddress: "93.184.216.34",
        remotePort: 80,
        fromDiskCache: false,
        fromServiceWorker: false,
        fromPrefetchCache: false,
        encodedDataLength: 373,
        timing: {
            requestTime: 252978.083727,
            proxyStart: -1,
            proxyEnd: -1,
            dnsStart: 0.255,
            dnsEnd: 3.578,
            connectStart: 3.578,
            connectEnd: 129.999,
            sslStart: -1,
            sslEnd: -1,
            workerStart: -1,
            workerReady: -1,
            sendStart: 130.083,
            sendEnd: 130.137,
            pushStart: 0,
            pushEnd: 0,
            receiveHeadersEnd: 267.09,
        },
        protocol: "http/1.1",
        securityState: "insecure",
    },

    frameId: "28807CCE21DED25A728599CE423DDC7F",
};

// WEBSOCKETS DATA TESTING
webSocket = {
    requestId: "1234",
    timestamp: 1234,
    wallTime: 1234,
    request: {
        headers: {
            Pragma: "no-cache",
            Origin: "http://www.gearhack.com",
            "Accept-Encoding": "gzip, deflate, br",
            Host: "stone.reauthenticator.com",
            "Accept-Language": "en-US,en;q=0.9",
            "Sec-WebSocket-Key": "0p53eb1yoMDCgYPDyzoUKQ==",
            "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36",
            Upgrade: "websocket",
            "Sec-WebSocket-Extensions":
                "permessage-deflate; client_max_window_bits",
            "Cache-Control": "no-cache",
            Connection: "Upgrade",
            "Sec-WebSocket-Version": "13",
        },
    },
    initiator: {
        type: "script",
        stack: {
            callFrames: [
                {
                    functionName: "_0x305b3c",
                    scriptId: "11",
                    url: "https://statdynamic.com/lib/crypta.js",
                    lineNumber: 0,
                    columnNumber: 1005051,
                },
            ],
        },
    },
};

webSocket2 = {
    requestId: "1255",
    timestamp: 1234,
    wallTime: 1234,
    request: {
        headers: {
            Pragma: "no-cache",
            Origin: "http://www.gearhack.com",
            "Accept-Encoding": "gzip, deflate, br",
            Host: "stone.reauthenticator.com",
            "Accept-Language": "en-US,en;q=0.9",
            "Sec-WebSocket-Key": "0p53eb1yoMDCgYPDyzoUKQ==",
            "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36",
            Upgrade: "websocket",
            "Sec-WebSocket-Extensions":
                "permessage-deflate; client_max_window_bits",
            "Cache-Control": "no-cache",
            Connection: "Upgrade",
            "Sec-WebSocket-Version": "13",
        },
    },
};

webSocket3 = {
    requestId: "1266",
    timestamp: 1234,
    wallTime: 1234,
    request: {
        headers: {
            Pragma: "no-cache",
            Origin: "http://www.gearhack.com",
            "Accept-Encoding": "gzip, deflate, br",
            Host: "stone.reauthenticator.com",
            "Accept-Language": "en-US,en;q=0.9",
            "Sec-WebSocket-Key": "0p53eb1yoMDCgYPDyzoUKQ==",
            "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36",
            Upgrade: "websocket",
            "Sec-WebSocket-Extensions":
                "permessage-deflate; client_max_window_bits",
            "Cache-Control": "no-cache",
            Connection: "Upgrade",
            "Sec-WebSocket-Version": "13",
        },
    },
};

frameError = {
    requestId: "1234",
    timestamp: 933369.885713,
    errorMessage:
        "Error during WebSocket handshake: Unexpected response code: 503",
};

frame = {
    requestId: "1255",
    timestamp: 933550.300287,
    response: {
        opcode: 1,
        mask: false,
        payloadData: '{"type":"hash_accepted","params":{"hashes":10240}}',
    },
};

frame64 = {
    requestId: "1266",
    timestamp: 933550.300287,
    response: {
        opcode: 1,
        mask: false,
        payloadData: "b3Bjb2RlOiAxLCBtYXNrOiBmYWxzZSwgcGF5bG9hZERhdGE6ICd7InR5cGUiOiJoYXNoX2FjY2VwdGVkIiwicGFyYW1zIjp7Imhhc2hlcyI6MTAyNDB9fScK"
    },
};

data = {
    // Request will be sent data
    requestWillBeSent: requestWillBeSent,
    requestWillBeSent2: requestWillBeSent2,

    // Loading failed data
    loadingFailed: loadingFailed,
    loadingFailed2: loadingFailed2,

    // Loading finished data
    loadingFinished: loadingFinished,
    loadingFinished2: loadingFinished2,

    // Response received
    responseReceived: responseReceived,

    // WebSocket data
    webSocket: webSocket,
    webSocket2: webSocket2,
    webSocket3: webSocket3,
    frameError: frameError,
    frame: frame,
    frame64: frame64,
};

module.exports = data;
