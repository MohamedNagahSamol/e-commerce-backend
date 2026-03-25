const costomerController = require("../controller/customercontrooler");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mioddleware = require("../middleware/customeriddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/signupcustomer",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number",
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  costomerController.post_signup,
);
router.post("/logincustomer",costomerController.post_login)


module.exports=router