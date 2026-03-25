const prodectcontroller = require("../controller/prodectcontroller");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/vondermiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/newprodect",
  middleware.requireAuth,
  upload.array("image"),
  prodectcontroller.post_newProdect,
);
router.post("/prodect/:id", prodectcontroller.findProdectById);
router.delete(
  "/removeprodect/:id",
  middleware.requireAuth,
  prodectcontroller.removeprodect,
);
router.get(
  "/allprodectvonder",
  middleware.requireAuth,
  prodectcontroller.allprodectvonder,
);
router.post("/search",prodectcontroller.search)
router.get("/allprodect", prodectcontroller.allprodect);
module.exports = router;
