import "./App.css";
import { useState } from "react";

import axios from "axios";

function App() {
  const [code, setCode] = useState({
    code: "",
    result: "Submit Code to See Result",
    lang: "c++",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert("submit code");
    axios
      .post(`http:localhost:8000/code/submit`, code)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data.err) {
          // Error in user code
          setCode({
            result: data.error,
          });
        } else {
          setCode({
            result: data.output,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCodeChangeHandler = (e) => {
    setCode({
      code: e.target.value,
    });
  };
  const onInputChangeHandler = (e) => {
    setCode({
      input: e.target.value,
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <select
              id="lang"
              onChange={(e) => setCode({ lang: e.target.value })}
            >
              <option value="c++">C++</option>
              <option value="c">C</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
            <p className="lead d-block my-0">Code your code here</p>
            <textarea
              type="text"
              id="code"
              value={code.code}
              onChange={onCodeChangeHandler}
            ></textarea>
          </div>
          <div className="col-12 mt-3">
            <p className="lead d-block my-0">Provide Input</p>
            <textarea
              type="text"
              id="input"
              value={code.input}
              onChange={onInputChangeHandler}
            ></textarea>
          </div>
        </div>
        <button className="btn btn-success" onClick={onSubmitHandler}>
          Submit Code
        </button>
        <div className="row">
          <div className="col-12 my-5">
            <textarea
              type="text"
              id="result"
              value={code.result}
              disabled={true}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
