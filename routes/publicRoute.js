/* ----------- Public API Route ---------- */

const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

// ! ------------------ PRODUCTS API -----------------
router.get("/products", async (req, res) => {
  const productCollection = req.productCollection;
  const products = await productCollection.find().toArray();
  res.send(products.reverse());
});

// ! ---------------- POPULAR PRODUCTS --------------------
router.get("/popular-products", async (req, res) => {
  const productCollection = req.productCollection;
  const popularProducts = await productCollection
    .find({})
    .sort({ timeDate: -1 })
    .limit(6)
    .toArray();
  res.send(popularProducts);
});

// ! ------------------ PRODUCTS DETAILS API---------------
router.get("/products/:id", async (req, res) => {
  const productCollection = req.productCollection;
  const id = req.params.id;
  console.log(id);
  const product = await productCollection.findOne({ _id: new ObjectId(id) });
  console.log(product);
  res.send(product);
});

module.exports = router;
