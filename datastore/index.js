const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////
/*
  5) should create a new file for each todo
      6) should use the generated unique id as the filename
      7) should only save todo text contents in file
      ✓ should pass a todo object to the callback on success
*/
exports.create = (text, callback) => {
  // if there's no text, throw error
  if (!text) {
    throw 'error: no text provided';
  } else {
    counter.getNextUniqueId((err, newID) => {
      // write new todo to a file specified in dataDir
      fs.writeFile(path.join(exports.dataDir, newID + '.txt'), text, (err) => {
        if (err) {
          throw 'error: cannot write new todo';
        } else {
          callback(null, { text: text, id: newID });
        }
      });
    });
  }
};

/*
    8) should return an empty array when there are no todos
      9) should return an array with all saved todos
*/
exports.readAll = (callback) => {
  // read the dataDir directory
  fs.readdir(exports.dataDir, (err, files) => {
    // if nothing is found, throw error
    if (err) {
      throw 'error: dataDir directory not found';
    } else {
      // read each file and return its name
      var result = [];
      for (let i = 0; i < files.length; i++) {
        // read each file
        var current = files[i];
        // console.log(current);
        result.push({
          id: current.substr(0, 5),
          text: current.substr(0, 5),
        });
        // console.log(result);
      }
      callback(null, result);
    }
  });
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};
/*
10) should not change the counter
      11) should update the todo text for existing todo
      */
exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};
/*
  12) should not change the counter
*/
exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
