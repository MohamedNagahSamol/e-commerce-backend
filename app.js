const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_Name,
  api_key: process.env.API_key,
  api_secret: process.env.API_secret,
});

const mongo = require("mongoose");
const cutomerrouter = require("./router/customerrouter");
const vonderrouter = require("./router/vonderrouter");
const prodectrouter = require("./router/prodectrouter");
const orderrouter = require("./router/orderrouter");
const cartshoppingrouter = require("./router/shoppingcartrouter");
app.use(cartshoppingrouter)
app.use(prodectrouter);
app.use(orderrouter);
app.use(cutomerrouter);
app.use(vonderrouter);
app.get("/", (req, res) => {
  res.send("hello");
});
mongo
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
