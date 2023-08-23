/* ----------- USER API Route ---------- */

const express = require("express");
const router = express.Router();
const {ObjectId} = require('mongodb')

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

// ! ------------------ DELETE CART ITEM ---------------
router.delete("/delete-cart/:id", async (req, res) => {
  const cartCollection = req.cartCollection;
  const id = req.params.id;
  const result = await cartCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

// !------------------ CHECKOUT -----------------------
router.post("/checkout", async (req, res) => {
  const orderCollection = req.orderCollection;
  const cartCollection = req.cartCollection;
  const data = req.body;
  const cartsID = data.products.map((product) => new ObjectId(product.cartID));
  const insertResult = await orderCollection.insertOne(data);
  if (insertResult.insertedId) {
    const deleteResult = await cartCollection.deleteMany({
      _id: { $in: cartsID },
    });
    return res.send(deleteResult);
  }
  const cancelRequest = await orderCollection.deleteOne({
    _id: insertResult.insertedId,
  });
  res.send(cancelRequest);
});

// !------------------ MY ORDERS --------------
router.get("/my-orders", async (req, res) => {
  const orderCollection = req.orderCollection;
  const query = {
    userPhone: `+${req.query?.userPhone?.split(" ")?.join("")}`,
  };
  const orders = await orderCollection.find(query).toArray();
  res.send(orders.reverse());
});

module.exports = router;
