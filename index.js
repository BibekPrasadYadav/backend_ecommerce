const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
const cors = require("cors");

const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Category");
const brandsRouter = require("./routes/Brand");
const authRouter = require("./routes/Auth");
const usersRouter = require("./routes/User");
const cartsRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

server.use(cors());

// Middleware to handle preflight requests

server.use(express.json()); //to parse req.body

//middleware
server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/auth", authRouter.router);
server.use("/users", usersRouter.router);
server.use("/cart", cartsRouter.router);
server.use("/orders", ordersRouter.router);
//dbconnection
main().catch((err) => console.log(err));

async function main() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/backend_ecommerce")
  await mongoose.connect(
    "mongodb+srv://Bibek:Bibek@ecommercedb.uj2rc40.mongodb.net/ecommerce_db?retryWrites=true&w=majority&appName=EcommerceDb"
  );
  console.log("db connected");
}

server.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(8080, () => {
  console.log("Server started at 8080");
});
