//const customer = require("../module/customermodule");
const prodect = require("../module/prodectmodule");
const shopping = require("../module/shoppingcartmodule");

const post_shopping = async (req, res) => {
  try {
    const Prodect = await prodect.findById(req.params.id);
    if (Prodect.available_quantity == 0) {
      return res.json({ message: "not available quantity" });
    }
    var cart = await shopping.findOne({ customer: req.customer._id });
    if (!cart) {
      cart = new shopping({
        customer: req.customer._id,
        prodects: [],
        total_price: 0,
      });
    }
    const existprodect = cart.prodects.find(
      (p) => p.id.toString() === req.params.id,
    );
    if (existprodect) {
    
      existprodect.quantity += 1;
      existprodect.price = Prodect.price * existprodect.quantity;
    } else {
     
      cart.prodects.push({
        id: req.params.id,
        quantity: 1,
        price: Prodect.price,
      });
    }

    const TOTAL_PRICE = cart.prodects.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    cart.total_price = TOTAL_PRICE;
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err);
  }
};

const delete_shopping = async (req, res) => {
  try {
    var cart = await shopping.findOne({ customer: req.customer._id });
    if (cart) {
      const existprodect = cart.prodects.find(
        (p) => p.id.toString() === req.params.id,
      );
      if (existprodect) {
        const index = cart.prodects.findIndex((x) => x === existprodect);
        cart.prodects.splice(index, 1);
      }
      const TOTAL_PRICE = cart.prodects.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
      cart.total_price = TOTAL_PRICE;
      await cart.save();
      res.json(cart);
    } else {
      res.json({ message: "no found shopping cart" });
    }
  } catch (err) {
    console.log(err);
  }
};
const cart_allprodects = async (req, res) => {
  var cart = await shopping.findOne({ customer: req.customer._id });

  res.json(cart);
};
module.exports = { post_shopping, delete_shopping, cart_allprodects };
