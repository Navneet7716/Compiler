const submitController = require("../controller/SubmitController");

const router = require("express").Router();

router.post("/submit", submitController.HandleSubmit);
//   .get("/submit", (req, res) => {
//     res.json({ hello: "Hello" });
//   });

module.exports = router;
