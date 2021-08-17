const fs = require("fs");

exports.deleteFile = (filename) => {
  fs.unlink(filename, function (err) {
    if (err) {
      console.log("SORRY NOT DELETED");
    }
    console.log("File deleted!");
  });
};
