/* ----------- USER API Route ---------- */

const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  res.send("This is user route!");
});

module.exports = router;
