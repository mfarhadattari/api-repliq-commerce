/* ----------- Admin API Route ---------- */

const express = require("express");
const router = express.Router();

// ! ------------------ PRODUCTS ---------------
router.get("/products", async (req, res) => {
  const productCollection = req.productCollection;
  const products = await productCollection.find().toArray();
  res.send(products.reverse());
});

module.exports = router;
