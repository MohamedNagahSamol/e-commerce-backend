const customer = require("../module/customermodule");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const moment = require("moment");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const { check, validationResult } = require("express-validator");
const nodemalier = require("nodemailer");
var jwt = require("jsonwebtoken");

const post_signup = async (req, res) => {
  try {
    const objError = validationResult(req);
    if (objError.errors.length > 0) {
      return res.json({ message: objError.errors });
    }
    const isEmailExist = await customer.findOne({ email: req.body.email });
    if (isEmailExist) {
      return res.json({ message: "this email is exist" });
    }
    const newCustomer = await customer.create(req.body);
    const token = jwt.sign({ id: newCustomer._id }, process.env.JWT_SECRET_KEY);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
    res.json({ message: "correct signup customer" });
  } catch (err) {
    console.log(err);
  }
};

const post_login = async (req, res) => {
  try {
    const loginCustomer = await customer.findOne({ email: req.body.email });
    if (loginCustomer == null) {
      return res.json({ message: "email not found" });
    }
    const match = await bcrypt.compare(
      req.body.password,
      loginCustomer.password,
    );
    if (match) {
      const token = jwt.sign(
        { id: loginCustomer._id },
        process.env.JWT_SECRET_KEY,
      );
      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.json({ message: "correct login customer" });
    } else {
      res.json({ message: "password incorrect" });
    }
  } catch (err) {
    console.log(err);
  }
};


module.exports={post_login,post_signup}
