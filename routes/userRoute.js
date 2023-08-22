/* ----------- USER API Route ---------- */

const express = require("express");
const route = express.Router();

route.get("/user", (req, res) => {
  res.send("This is user route!");
});

module.exports = route;
