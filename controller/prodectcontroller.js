const prodect = require("../module/prodectmodule");
const moment = require("moment");
const cloudinary = require("cloudinary").v2;
const Vonder = require("../module/vondermodule");
const post_newProdect = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "no image upload" });
    }

    let counterimage = [];
    for (const file of req.files) {
      const imge = await cloudinary.uploader.upload(file.path);
      counterimage.push(imge.secure_url);
    }
    req.body.vonder = req.vonder._id;
    const newprodect = await prodect.create(req.body);
    newprodect.image = counterimage;
    const vonder = await Vonder.findById(req.vonder._id);
    vonder.prodects.push(newprodect._id);
    await vonder.save();
    await newprodect.save();
    res.json({ message: "added new prodect" });
  } catch (err) {
    console.log(err);
  }
};
const findProdectById = async (req, res) => {
  try {
    let findprodect = await prodect.findById(req.params.id);
    const Prodect = {
      name: findprodect.name,
      price: findprodect.price,
      description: findprodect.description,
      image: findprodect.image,
      vonder: findprodect.vonder,
      CreateAt: moment(findprodect.createdAt).fromNow(),
      available_quantity: findprodect.available_quantity,
    };
    res.json(Prodect);
  } catch (err) {
    console.log(err);
  }
};

const removeprodect = async (req, res) => {
  try {
    const Prodect = await prodect.findOne({
      vonder: req.vonder._id,
      _id: req.params.id,
    });
    if (!Prodect) {
      return res.json({ message: "this prodect not found" });
    }
    const remove = await prodect.deleteOne({
      vonder: req.vonder._id,
      _id: req.params.id,
    });
    res.json({ message: "prodect is removed" });
  } catch (err) {
    res.json({ message: err });
  }
};
const allprodect = async (req, res) => {
  const prodects = await prodect.find({});
  res.json(prodects);
};
const allprodectvonder = async (req, res) => {
  const prodects = await prodect.find({ vonder: req.vonder._id });
  res.json(prodects);
};
const search = (req, res) => {
  prodect
    .find({ name: { $regex: req.body.search, $options: "i" } })
    .sort({ name: 1 })
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};
module.exports = {
  post_newProdect,
  findProdectById,
  removeprodect,
  allprodect,
  allprodectvonder,
  search,
};
