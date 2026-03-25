const mongo = require("mongoose");
const Schema = mongo.Schema;
const bcrypt = require("bcrypt");
const { type } = require("node:os");

const VonderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    adderss: String,
    prodects: [],
    products_sold: [],
  },
  { timestamps: true },
);

VonderSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
const vonder = mongo.model("Vonder", VonderSchema);
module.exports = vonder;
