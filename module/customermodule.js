const mongo = require("mongoose");
const Schema = mongo.Schema;
const bcrypt = require("bcrypt");

const CostomerSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password:String ,
    phone: {
      type: String,
    },
    adderss: String,
  },
  { timestamps: true },
);

CostomerSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
const customer = mongo.model("Customer", CostomerSchema);
module.exports = customer;
