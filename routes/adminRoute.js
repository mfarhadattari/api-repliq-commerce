/* ----------- Admin API Route ---------- */

const express = require("express");
const router = express.Router();
const {ObjectId} = require("mongodb")

// ! ------------------ PRODUCTS ---------------
router.get("/products", async (req, res) => {
  const productCollection = req.productCollection;
  const products = await productCollection.find().toArray();
  res.send(products.reverse());
});

// ! ------------------ DELETE PRODUCT ---------------
router.delete("/delete-product/:id", async (req, res) => {
  const productCollection = req.productCollection;
  const id = req.params.id;
  const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

// ! ----------- UPDATE PRODUCT ---------------
router.patch("/update-product/:id", async (req, res) => {
  const productCollection = req.productCollection;
  const query = { _id: new ObjectId(req.params.id) };
  const data = req.body;
  const updateDoc = {
    $set: {
      ...data,
    },
  };
  const result = await productCollection.updateOne(query, updateDoc);
  res.send(result);
});

module.exports = router;
