const cart = require("../module/shoppingcartmodule");
const order = require("../module/ordermodule");
const prodect = require("../module/prodectmodule");
const Vonder = require("../module/vondermodule");

const post_order = async (req, res) => {
  try {
    const productss = await cart.findById(req.params.id);
    const new_order = {
      customer: productss.customer,
      prodects: productss.prodects,
      status: "pending",
      price: productss.total_price,
    };

    await Promise.all(
      productss.prodects.map(async (item) => {
        const Prodect = await prodect.findById(item.id);
        if (
          Prodect.available_quantity == 0 ||
          item.quantity > Prodect.available_quantity
        ) {
          throw new Error("not available quantity");
        }
      }),
    );
    await Promise.all(
      productss.prodects.map(async (item) => {
        const Prodect = await prodect.findById(item.id);
        Prodect.available_quantity -= item.quantity;
        await Prodect.save();
      }),
    );

    await order.create(new_order);
    await cart.deleteOne({ _id: req.params.id });
    res.json(new_order);
  } catch (err) {
    res.json({ message: err });
  }
};
const canceled_order = async (req, res) => {
  const productss = await order.findById(req.params.id);
  if (productss) {
    productss.status = "canceled";
    await productss.save();
    await Promise.all(
      productss.prodects.map(async (item) => {
        const Prodect = await prodect.findById(item.id);
        Prodect.available_quantity += item.quantity;
        await Prodect.save();
      }),
    );
    res.json({ message: "this shopping cart is canceld" });
  }
};
const processing_order = async (req, res) => {
  const productss = await order.findById(req.params.id);
  if (productss) {
    productss.status = "processing";
    await productss.save();
    res.json({ message: "this shopping cart is processing" });
  }
};
const shipped_order = async (req, res) => {
  const productss = await order.findById(req.params.id);
  if (productss) {
    productss.status = "shipped";
    await productss.save();
    res.json({ message: "this shopping cart is shipped" });
  }
};
const completed_order = async (req, res) => {
  const productss = await order.findById(req.params.id);
  if (productss) {
    productss.status = "completed";
    await productss.save();
    await Promise.all(
      productss.prodects.map(async (item) => {
        const Prodect = await prodect.findById(item.id);
        const vonder = await Vonder.findById(Prodect.vonder);
        vonder.products_sold.push({ id: item.id, quantity: item.quantity });
        await vonder.save();
      }),
    );

    res.json({ message: "this shopping cart is completed" });
  }else{
    console.log('err')
  }
};
module.exports = {
  post_order,
  completed_order,
  shipped_order,
  processing_order,
  canceled_order,
};
