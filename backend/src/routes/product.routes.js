const { Router } = require("express");
const { createProduct, getUserProducts, getAllProducts, deleteProduct } = require("../controllers/product.controller");
const { authenticate } = require("../middlewares/auth");

const router = Router();

router.use(authenticate);
router.post("/", createProduct);
router.get("/", getUserProducts);
router.delete("/:id", deleteProduct);

module.exports = router;
