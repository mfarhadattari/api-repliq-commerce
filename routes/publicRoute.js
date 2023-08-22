/* ----------- Public API Route ---------- */

const express = require("express");
const router = express.Router();

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

module.exports = router;
