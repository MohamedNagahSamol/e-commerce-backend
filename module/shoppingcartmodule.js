const mongo = require("mongoose");
const Schema = mongo.Schema;
const { type } = require("node:os");

const Cartschema = new Schema(
  {
    customer: String,
    prodects: [{
        id:String,
        quantity:Number,
        price:Number,
    }],
    total_price: Number,
  },
  { timestamps: true },
);

const shopping = mongo.model("Shopping_cart", Cartschema);
module.exports = shopping;
