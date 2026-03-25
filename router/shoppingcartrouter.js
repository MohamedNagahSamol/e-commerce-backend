const shoppingcartcontroller = require("../controller/shoppingcartcontroller");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/customeriddleware");

router.post(
  "/addcart/:id",
  middleware.requireAuth,
  shoppingcartcontroller.post_shopping,
);
router.delete(
  "/deletcart/:id",
  middleware.requireAuth,
  shoppingcartcontroller.delete_shopping,
);
router.get(
  "/allprodectsincart",
  middleware.requireAuth,
  shoppingcartcontroller.cart_allprodects,
);

module.exports = router;
