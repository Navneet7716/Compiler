const express = require("express");
const app = express();
const Submitrouter = require("./routes/routes");

const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./client/build"));

app.use("/api/v1", Submitrouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
