/* ----------- USER API Route ---------- */

const express = require("express");
const router = express.Router();

// ! ------------------ MY CART ---------------
router.get("/my-cart", async (req, res) => {
  const cartCollection = req.cartCollection;
  const query = {
    userPhone: `+${req.query?.userPhone?.split(" ")?.join("")}`,
  };
  const cart = await cartCollection.find(query).toArray();
  res.send(cart);
});

// ! ------------------ ADD TO CART ---------------
router.post("/add-to-cart", async (req, res) => {
  const cartCollection = req.cartCollection;
  const data = req.body;
  const query = { userPhone: data.userPhone, productID: data.productID };
  const alreadyExist = await cartCollection.findOne(query);
  if (alreadyExist) {
    const updateDoc = {
      $set: {
        quantity: alreadyExist.quantity + 1,
      },
    };
    const result = await cartCollection.updateOne(query, updateDoc);
    return res.send(result);
  }
  const result = await cartCollection.insertOne(data);
  return res.send(result);
});

module.exports = router;
