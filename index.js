// dependencies
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

// variable
const app = express();
const port = process.env.PORT || 3000;

// importing external route
const publicRoute = require("./routes/publicRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");

// middleware
app.use(cors());
app.use(express.json());

// connect db
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    client.connect();

    // database
    const db = client.db("repliq-commerce");
    
    // collections middleware
    app.use((req, res, next) => {
      req.productCollection = db.collection("products");
      req.cartCollection = db.collection("carts");
      req.orderCollection = db.collection("orders");
      req.customerCollection = db.collection("customers");
      req.userCollection = db.collection("users");
      next();
    });

    // route middleware
    app.use("/", publicRoute);
    app.use("/", userRoute);
    app.use("/admin", adminRoute);
    app.use("/auth", authRoute);

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.dir(error);
  }
})();

app.get("/", (req, res) => {
  res.send("Repliq Commerce Server is running!");
});

app.listen(port, () => {
  console.log(`Repliq Commerce Server is running on port ${port}!`);
});
