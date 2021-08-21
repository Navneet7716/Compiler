const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

exports.CplusplusRunner = async (code, input) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = "b.cpp";
    saveFile(fileName, code)
      .then(() => {
        fs.writeFile("inputb.txt", input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, "../b.cpp");
        console.log("cpp file -> " + filePath);

        exec("sudo g++ " + filePath, (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err,
              error: stderr,
            });
          }

          console.log("compilation done..");
          exec("sudo ./a.out < " + "inputb.txt", (err, stdout, stderr) => {
            if (err) {
              console.log("ERROR " + err);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }

            console.log("output \n ", stdout);
            resolve({
              err: false,
              output: stdout,
            });
          });
        });
      })
      .catch((e) => {
        console.log("error saving file " + e);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};
exports.CRunner = async (code, input) => {
  return new Promise((resolve, reject) => {
    const fileName = "a.c";
    saveFile(fileName, code)
      .then(() => {
        fs.writeFile("inputa.txt", input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, "../a.c");
        console.log("c file -> " + filePath);

        exec("gcc " + filePath, (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err,
              error: stderr,
            });
          }

          console.log("Compilation done");
          exec("./a.out < " + "inputa.txt", (err, stdout, stderr) => {
            if (err) {
              console.log("error " + err);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }

            console.log("output: \n ", stdout);
            resolve({
              err: false,
              output: stdout,
            });
          });
        });
      })
      .catch(() => {
        console.log("error while saving the file \n" + saveFileRes);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};
exports.PythonRunner = async (code, input) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = "c.py";
    saveFile(fileName, code)
      .then(() => {
        fs.writeFile("inputc.txt", input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, "../c.py");
        console.log("python file -> " + filePath);
        const inputPath = path.join(__dirname, "../inputc.txt");
        exec(
          "python3 " + filePath + " < " + inputPath,
          (err, stdout, stderr) => {
            if (err) {
              console.error(`exec error: ${err}`);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }
            resolve({
              err: false,
              output: stdout,
            });
          }
        );
      })
      .catch(() => {
        console.log("error saving python file \n" + saveFileRes);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

const saveFile = async (name, data) => {
  return new Promise((resolve, reject) => {
    console.log("saving ...");
    fs.writeFile(name, data || null, function (err) {
      if (err) {
        console.log(err);
        reject();
      } else {
        console.log("file saved");
        resolve();
      }
    });
  });
};
