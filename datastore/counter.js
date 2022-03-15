const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;
// creates a counter variable
var counter = 0;
// change what the counter is set to
// Private helper functions ////////////////////////////////////////////////////
// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F
const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};
// reads the counter from exports.counterFile
const readCounter = function (callback) {
  fs.readFile(exports.counterFile, function (err, fileData) {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};
// writes the counter to exports.counterFile
const writeCounter = function (count, callback) {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};
// Public API - Fix this function //////////////////////////////////////////////
//seems need to add a callback function to generate the counter and also store the current counter to the function....???
//this uniqueId might be an object instead, one proptery is the ID... the other mgitht be a func???
exports.getNextUniqueId = (cb) => {
  // read from the counter.txt
  readCounter((err, counterData) => {
    if (err) {
      throw ('error reading counter');
    } else {
      writeCounter(counterData + 1, (err, newID) => {
        if (err) {
          cb(err);
        } else {
          cb(null, newID);
        }
      });
    }
  });
  // increment counter
  // counter = counter + 1;

  // write new number to the counter
  // writeCounter(counter, callback);

  // return statement
  return zeroPaddedNumber(counter);
  // write the result of the function to _dirname
  // err as a param and a callback function as param
};
// Configuration -- DO NOT MODIFY //////////////////////////////////////////////
exports.counterFile = path.join(__dirname, 'counter.txt');
