const express = require("express");
const router = express.Router();
const {
  createproductcontroller,
  getAllProductsController,
  getProductById,
  deleteProduct,
  updateProduct
} = require("../controllers/productControllers");

router.route("/").post(createproductcontroller).get(getAllProductsController);
router.route("/:id").get(getProductById).delete(deleteProduct).patch(updateProduct);

module.exports = router;
