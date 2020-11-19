

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


// ------------------------------------
// Module exports
// ------------------------------------
module.exports = {
    // Sleep function
    sleep: sleep,
};
