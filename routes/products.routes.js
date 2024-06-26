const express = require("express");
const router = express.Router();

const productCtrl = require("../controllers/products.controller");

router.get("/seed", productCtrl.seed);
router.get("/", productCtrl.findAll);
router.get("/:id", productCtrl.findOne);
router.post("/", productCtrl.create);
router.patch("/:id", productCtrl.update);
router.delete("/:id", productCtrl.delete);

module.exports = router;
