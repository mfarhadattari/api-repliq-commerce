/* ----------- Authentication API Route ---------- */

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is auth route!");
});

module.exports = router;
