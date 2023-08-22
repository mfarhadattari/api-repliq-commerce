/* ----------- Authentication API Route ---------- */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// ! -------------------- CREATE ACCOUNT --------------
router.post("/create-account", async (req, res) => {
  const userCollection = req.userCollection;
  const { userName, userPhone, avatar, password } = req.body;
  const alreadyExist = await userCollection.findOne({ userPhone });
  if (alreadyExist) {
    return res.send({ alreadyAccount: true });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await userCollection.insertOne({
    userName,
    userPhone,
    avatar,
    password: hashedPassword,
  });
  res.send(result);
});

module.exports = router;
