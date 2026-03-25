const vonderController = require("../controller/vendercontroller");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mioddleware = require("../middleware/vondermiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/signupvonder",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number",
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  vonderController.post_signup,
);
router.post("/loginvonder",vonderController.post_login)


module.exports=router
