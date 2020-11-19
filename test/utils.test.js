/*
 * Testing the utils.js with Jest file
 *
 * Alberto FDR
 */

const utils = require("../lib/utils.js");

// Test sleep function
jest.useFakeTimers();

test("Waits X miliseconds", () => {
    utils.sleep(1000);

    // To ensure that a mock function, in this case setTimeout inside sleep function, got called exact number of times.
    expect(setTimeout).toHaveBeenCalledTimes(1);
    
    // To test what arguments it was last called with the funcion setTimeout inside sleep
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
