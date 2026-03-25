const ordercontrooler = require("../controller/ordercontroller");
const express = require("express");
const router = express.Router();
const mioddleware = require("../middleware/customeriddleware");

router.post("/addorder/:id", ordercontrooler.post_order);
router.put("/canceled/:id", ordercontrooler.canceled_order);
router.put("/completed/:id", ordercontrooler.completed_order);
router.put("/processing/:id", ordercontrooler.processing_order);
router.put("/shipped/:id", ordercontrooler.shipped_order);

module.exports = router;
