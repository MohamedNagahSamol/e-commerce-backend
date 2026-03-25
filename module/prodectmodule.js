const mongo = require("mongoose");
const Schema = mongo.Schema;
const { type } = require("node:os");

const ProdectsSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: [],
    },
    description: String,
    vonder: String,
    price: {
      type: Number,
    },
    available_quantity: {
      type: Number,
    },
  },
  { timestamps: true },
);

const prodect = mongo.model("Prodect", ProdectsSchema);
module.exports = prodect;
