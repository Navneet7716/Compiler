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
        console.log("FILE PATH >> " + filePath);

        exec("sudo g++ -s " + filePath, (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err,
              error: stderr,
            });
          }

          console.log("SUCCESSFULLY COMPILED");
          exec("sudo ./a.out < " + "inputb.txt", (err, stdout, stderr) => {
            if (err) {
              console.log("ERROR " + err);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }

            console.log("OUTPUT ", stdout);
            resolve({
              err: false,
              output: stdout,
            });
          });
        });
      })
      .catch((e) => {
        console.log("ERROR SAVE FILE " + e);
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
        console.log("FILE PATH >> " + filePath);

        exec("gcc -s " + filePath, (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err,
              error: stderr,
            });
          }

          console.log("SUCCESSFULLY COMPILED");
          exec("./a.out < " + "inputa.txt", (err, stdout, stderr) => {
            if (err) {
              console.log("ERROR " + err);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }

            console.log("OUTPUT ", stdout);
            resolve({
              err: false,
              output: stdout,
            });
          });
        });
      })
      .catch(() => {
        console.log("ERROR SAVE FILE" + saveFileRes);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

exports.JavaRunner = async (code, input) => {
  const res = {
    err: false,
    msg: "",
  };

  return new Promise((resolve, reject) => {
    const fileName = "test.java";
    saveFile(fileName, code)
      .then(() => {
        // Create Input file
        fs.writeFile("inputj.txt", input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        // FILE SAVED SUCCESSFULLY
        // Generate the output file for it
        const filePath = path.join(__dirname, "../test.java");
        console.log("FILE PATH >> " + filePath);

        // COMPILE THE C++ CODES
        exec("javac " + filePath, (err, stdout, stderr) => {
          if (err) {
            // IF COMPILATION ERROR
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err,
              error: stderr,
            });
          }

          // SUCCESSFULL COMPILATION EXECUTING
          console.log("SUCCESSFULLY COMPILED");
          exec("java test < " + "inputj.txt", (err, stdout, stderr) => {
            if (err) {
              console.log("ERROR " + err);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }

            console.log("OUTPUT ", stdout);
            resolve({
              err: false,
              output: stdout,
            });
          });
        });
      })
      .catch(() => {
        console.log("ERROR SAVE FILE" + saveFileRes);
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
        console.log("FILE PATH >> " + filePath);
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
        console.log("ERROR SAVE FILE" + saveFileRes);
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
    console.log("SAVING FILES");
    fs.writeFile(name, data || null, function (err) {
      if (err) {
        console.log(err);
        reject();
      } else {
        console.log("The file was saved!");
        resolve();
      }
    });
  });
};
