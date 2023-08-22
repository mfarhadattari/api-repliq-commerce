/* ----------- Public API Route ---------- */

const express = require("express");
const route = express.Router();

route.get("/public", (req, res) => {
  res.send("This is public route!");
});

module.exports = route;
