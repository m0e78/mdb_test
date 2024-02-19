const express = require("express")
const router = express.Router()
const {
  createproductcontroller,
  getAllProductsController,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/productControllers")

router.route("/").post(createproductcontroller).get(getAllProductsController)
router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProduct)
  .patch(updateProduct)

module.exports = router
// upload.single("products"), (req, res, next) => {
//   const { product } = req.body
//   productlist
// .create({
//   products: req.file.filename,
//   product,
// })
// .then((products, product) => {
//   res.status(201).json({ message: "product added successfully" })
// })
// .catch((err) => console.log(err))
// }
