import "./App.css";
import { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { Switch } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
  const [input, setinput] = useState("");
  const [darkmode, setDarkMode] = useState(false);

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

  const handleChange = (event) => {
    setDarkMode(!darkmode);
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
    <div className={darkmode ? "fullBodyDark" : "fullBody"}>
      <Container>
        {loading ? <LinearProgress /> : <></>}

        <h1
          style={{
            textAlign: "center",
          }}
          className=""
        >
          Welcome To Nav Code.
        </h1>

        <div
          className="row"
          // style={{
          //   display: "flex",
          //   flexWrap: "wrap",
          //   justifyContent: "space-between",
          //   flexDirection: "row",
          // }}
        >
          <div className="column left">
            <div className="">
              <FormControl
                variant="filled"
                className={classes.formControl}
                style={{ color: darkmode ? "white" : "black" }}
              >
                <InputLabel
                  style={{ color: darkmode ? "white" : "black" }}
                  id="demo-simple-select-outlined-label"
                >
                  Language
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={lang}
                  style={{ color: darkmode ? "white" : "black" }}
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
              <FormControlLabel
                control={
                  <Switch
                    style={{
                      color: "white",
                    }}
                    checked={darkmode}
                    onChange={handleChange}
                    color="primary"
                    name="checkedB"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                style={{
                  marginLeft: "500px",
                  textAlign: "center",
                }}
                label={darkmode ? "Dark Mode 🌚" : "Light Mode 🌞"}
              />

              <Paper
                elevation={3}
                style={{
                  padding: "5px",
                }}
              >
                <MonacoEditor
                  width="830"
                  height="500"
                  language={
                    localStorage.getItem("lang") != null
                      ? localStorage.getItem("lang")
                      : lang
                  }
                  theme={darkmode ? "vs-dark" : "vs-light"}
                  value={
                    localStorage.getItem("code") != null
                      ? JSON.parse(localStorage.getItem("code"))
                      : myCode
                  }
                  options={options}
                  onChange={onCodeChangeHandler}
                  editorDidMount={editorDidMount}
                />
              </Paper>
            </div>

            <div
              style={{
                display: "flex",
              }}
            >
              <div>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onSubmitHandler}
                      style={{
                        margin: "10px",
                      }}
                    >
                      Run
                    </Button>
                    <p>
                      if the submission doesn't works please try{" "}
                      <Button
                        color="secondary"
                        href="http://nav-compiler.herokuapp.com/"
                      >
                        here
                      </Button>
                    </p>
                  </>
                  // <button className="" onClick={onSubmitHandler}>
                  //   Submit Code
                  // </button>
                )}
              </div>
            </div>
          </div>
          <div className="column right">
            <h1>Output:</h1>
            <div className="">
              {/* <TextField
              fullwidth
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
                  height: "30vh",
                }}
                value={result}
                disabled={true}
                aria-label="minimum height"
                minRows={9}
                fullwidth
                placeholder="Minimum 3 rows"
              />
            </div>
            <div
            // style={{
            //   marginLeft: "500px",
            // }}
            >
              <div className="row">
                <h3 className="">Provide Input</h3>
              </div>
              <div>
                <textarea
                  placeholder="Give Input"
                  className="ui-autocomplete-input"
                  style={{
                    width: "300px",
                    height: "60vh",
                  }}
                  type="text"
                  value={input}
                  onChange={onInputChangeHandler}
                ></textarea>
                {/* <textarea
                style={{
                  width: "300px",
                  height: "200px",
                }}
                type="text"
                id="input"
                value={input}
                onChange={onInputChangeHandler}
              ></textarea> */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
