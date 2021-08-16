const express = require("express");
const app = express();
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// app.post("/code/submit", (req, res) => {
//   const { code, input, lang } = req.body;
//   res.json({ msg: "successful route" });
// });

const saveFile = (name, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, data, function (err) {
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

const cPlusPlusExecute = (data, input) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = "test.cpp";
    saveFile(fileName, data)
      .then(() => {
        // Create Input file
        fs.writeFile("input.txt", input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        // FILE SAVED SUCCESSFULLY
        // Generate the output file for it
        const filePath = path.join(__dirname, "../test.cpp");
        console.log("FILE PATH >> " + filePath);

        // COMPILE THE C++ CODES
        exec("g++ " + filePath, (err, stdout, stderr) => {
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
          exec("a.exe < " + "input.txt", (err, stdout, stderr) => {
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

app.post("/code/submit", (req, res) => {
  const { code, input, lang } = req.body;
  return cPlusPlusExecute(code, input)
    .then((data) => {
      console.log("SUCCESSFULL PROMISE " + data);
      console.log("SENDING " + data);
      res.json(data);
      deleteFile(path.join(__dirname, "../../input.txt"));
      deleteFile(path.join(__dirname, "../../test.cpp"));
    })
    .catch((err) => {
      console.log("ERROR PROMISE " + err);
      deleteFile(path.join(__dirname, "../../input.txt"));
      deleteFile(path.join(__dirname, "../../test.cpp"));
    });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
