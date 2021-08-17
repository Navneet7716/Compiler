import "./App.css";
import { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

import { makeStyles } from "@material-ui/core/styles";

import env from "./env/env";

import * as defaultCode from "./DefaultCode";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const [myCode, setCode] = useState(defaultCode.defaultCode.cpp);
  const [result, setResult] = useState("Submit Code to See Result");
  const [lang, setlang] = useState("cpp");
  const [loading, setLoading] = useState(false);
  const [input, setinput] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    alert("submit code");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setLoading(true);
    let mystate = {
      code:
        localStorage.getItem("code") != null
          ? JSON.parse(localStorage.getItem("code"))
          : myCode,
      lang:
        localStorage.getItem("lang") != null
          ? localStorage.getItem("lang")
          : lang,
      input,
      result,
    };

    console.log(mystate);

    axios
      .post(`${env.url}v1/submit`, mystate)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        const data = res.data;
        if (data.err) {
          // Error in user code
          setResult(data.error);
        } else {
          setResult(data.output);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const onCodeChangeHandler = (newcode, e) => {
    localStorage.setItem("lang", lang);
    localStorage.setItem("code", JSON.stringify(newcode));

    setCode(newcode);
  };
  const onInputChangeHandler = (e) => {
    setinput(e.target.value);
  };

  const editorDidMount = (e) => {
    console.log("EDITOR Loaded");
  };

  const onLangSelectHandler = (e) => {
    const langu = e.target.value;
    localStorage.clear();
    setlang(langu);
    setCode(defaultCode.defaultCode[langu]);
  };

  const options = {
    selectOnLineNumbers: true,
    renderIndentGuides: true,
    colorDecorators: true,
    cursorBlinking: "blink",
    autoClosingQuotes: "always",

    find: {
      autoFindInSelection: "always",
    },
    snippetSuggestions: "always",
  };

  const classes = useStyles();

  return (
    <Container>
      {loading ? (
        <LinearProgress />
      ) : (
        <></>
        // <button className="" onClick={onSubmitHandler}>
        //   Submit Code
        // </button>
      )}

      <h1 className="">Custom Code</h1>
      <div
        className=""
        style={{
          display: "flex",
          // flexWrap: "wrap",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <div className="row">
          <div className="col-12 mt-5">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Language
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={lang}
                onChange={(e) => onLangSelectHandler(e)}
                label="Language"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"cpp"}>C++</MenuItem>
                <MenuItem value={"c"}>C</MenuItem>
                <MenuItem value={"python"}>Python3</MenuItem>
              </Select>
            </FormControl>

            {/* 
            <select id="lang" onChange={(e) => onLangSelectHandler(e)}>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="python">Python</option>
            </select> */}

            <div type="text" id="code" className="card shadow">
              <MonacoEditor
                width="900"
                height="500"
                language={
                  localStorage.getItem("lang") != null
                    ? localStorage.getItem("lang")
                    : lang
                }
                theme="vs-dark"
                value={
                  localStorage.getItem("code") != null
                    ? JSON.parse(localStorage.getItem("code"))
                    : myCode
                }
                options={options}
                onChange={onCodeChangeHandler}
                editorDidMount={editorDidMount}
              />
            </div>
          </div>
          <div className="">
            <p className="lead d-block my-0">Provide Input</p>

            <textarea
              type="text"
              id="input"
              value={input}
              onChange={onInputChangeHandler}
            ></textarea>
          </div>

          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmitHandler}
            >
              Submit
            </Button>
            // <button className="" onClick={onSubmitHandler}>
            //   Submit Code
            // </button>
          )}
        </div>
        <div className="">
          <h1>Output:</h1>
          <div className="">
            {/* <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              value={result}
              disabled={true}
              style={{
                height: "500px",
              }}
            /> */}
            <TextareaAutosize
              style={{
                width: "300px",
              }}
              value={result}
              disabled={true}
              aria-label="minimum height"
              minRows={9}
              fullWidth
              placeholder="Minimum 3 rows"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;
