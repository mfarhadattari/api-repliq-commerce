/* ----------- Authentication API Route ---------- */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// ! -------------------- LOGIN ACCOUNT --------------
router.post("/login", async (req, res) => {
  const userCollection = req.userCollection;
  const { userPhone, password } = req.body;
  const user = await userCollection.findOne({ userPhone });
  if (!user) {
    return res.send({
      error: true,
      message: "Invalid phone number!",
    });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.send({
      error: true,
      message: "Wrong password!",
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const userInfo = {
    _id: user._id,
    userName: user.userName,
    userPhone: user.userPhone,
    avatar: user.avatar,
  };
  
  res.send({ token, user: userInfo });
});

module.exports = router;
