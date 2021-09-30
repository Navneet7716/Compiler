const express = require("express");
const app = express();
const Submitrouter = require("./routes/routes");

const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log(__dirname + "/test");

  res.send("Hello World!");
});

app.use("/api/v1", Submitrouter);

const port = 8080;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
