/* ----------- Admin API Route ---------- */

const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.send("This is admin route!");
});

module.exports = route;
