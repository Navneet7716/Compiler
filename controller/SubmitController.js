const compiler = require("./Compiler");
const deleteController = require("./deleteController");

const path = require("path");

exports.HandleSubmit = async (req, res) => {
  const { code, input, lang } = req.body;

  switch (lang) {
    case "cpp":
      return compiler
        .CplusplusRunner(code, input)
        .then((data) => {
          console.log("SUCCESSFULL PROMISE " + data);
          console.log("SENDING " + data);
          res.json(data);
          deleteController.deleteFile(path.join(__dirname, "../../input.txt"));
          deleteController.deleteFile(path.join(__dirname, "../../test.cpp"));
        })
        .catch((err) => {
          console.log("ERROR PROMISE " + err);
          deleteController.deleteFile(path.join(__dirname, "../../input.txt"));
          deleteController.deleteFile(path.join(__dirname, "../../test.cpp"));
        });
    case "c":
      return compiler
        .CRunner(code, input)
        .then((data) => {
          console.log("SUCCESSFULL PROMISE " + data);
          console.log("SENDING " + data);
          res.json(data);
          deleteController.deleteFile(path.join(__dirname, "../../input.txt"));
          deleteController.deleteFile(path.join(__dirname, "../../test.c"));
          deleteController.deleteFile(path.join(__dirname, "../../a.exe"));
        })
        .catch((err) => {
          console.log("ERROR PROMISE " + err);
          deleteController.deleteFile(path.join(__dirname, "../../input.txt"));
          deleteController.deleteFile(path.join(__dirname, "../../test.c"));
          deleteController.deleteFile(path.join(__dirname, "../../a.exe"));
        });

    case "python":
      return compiler
        .PythonRunner(code, input)
        .then((data) => {
          console.log("SUCCESSFULL PROMISE " + data);
          console.log("SENDING " + data);
          res.json(data);
          deleteController.deleteFile(path.join(__dirname, "../../input.txt"));
          deleteController.deleteFile(path.join(__dirname, "../../test.py"));
          deleteController.deleteFile(path.join(__dirname, "../../a.exe"));
        })
        .catch((err) => {
          console.log("ERROR PROMISE " + err);
          deleteController.deleteFile(path.join(__dirname, "../../input.txt"));
          deleteController.deleteFile(path.join(__dirname, "../../test.py"));
          deleteController.deleteFile(path.join(__dirname, "../../a.exe"));
        });
  }
};