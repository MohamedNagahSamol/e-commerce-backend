const mongo = require("mongoose");
const Schema = mongo.Schema;
const { type } = require("node:os");

const Orderschema = new Schema(
  {
    customer: String,
    prodects: [],
    status: String,
    price: Number,
  },
  { timestamps: true },
);

const order = mongo.model("Order", Orderschema);
module.exports = order;
