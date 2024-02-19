const { StatusCodes } = require("http-status-codes")
// const Product = require("../model/productlist");
const productlist = require("../model/productlist")
const customError = require("../middleware/errorHandler")
const path = require("path")
const multer = require("multer")

const createproductcontroller = async (req, res) => {
  console.log(req.body)
  // const {name,price,series_number}=req.body
  const product = await productlist.create({ ...req.body })

  res.status(StatusCodes.CREATED).json({ product })
}
// const createproductcontroller = async (req, res) => {
//   // try {
//     const { name, price, series_number } = req.body;

//     // Validate required fields
//     if (!name) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ error: "Name is required" });
//     }

//     // Validate data using Mongoose schema
//     const product = new Product({
//       name,
//       price,
//       series_number,
//     });

//     // Save the product
//     await product.save();

//     res.status(StatusCodes.CREATED).json({ product });
//   // } catch (error) {
//   //   console.error(error);
//   //   res
//   //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
//   //     .json({ error: "Internal Server Error" });
//   // }
// };

const getAllProductsController = async (req, res) => {
  // try {
  const products = await productlist.find()
  res.status(StatusCodes.OK).json({ products })
  // } catch (error) {
  //   res
  //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //     .json({ error: "internal server error" });
  // }
}

const getProductById = async (req, res) => {
  const { id: productId } = req.params
  const product = await productlist.findOne({ _id: productId })
  if (!product) throw new customError.NotFoundError(`no product with id: ${id}`)
  res.status(StatusCodes.OK).json({ product })
}

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await productlist.findOne({ _id: productId })
  if (product) {
    await productlist.findOneAndDelete({ _id: productId })
    res.status(StatusCodes.OK).json({ message: "product removed" })
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: "product not found" })
  }
}

const updateProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await productlist.findOne({ _id: productId })
  if (product) {
    await productlist.findOneAndUpdate({ _id: productId }, req.body)
    res.status(StatusCodes.OK).json({ message: "product updated" })
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: "product not found" })
  }
}

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     console.log(file.originalname.split(".")[0])
//     console.log(
//       "file " +
//         file.originalname.split(".")[0] +
//         "-" +
//         Date.now() +
//         path.extname(file.originalname)
//     )
//     cb(
//       null,
//       file.originalname.split(".")[0] +
//         "-" +
//         Date.now() +
//         path.extname(file.originalname)
//     )
//   },
// })
// const upload = multer({ storage: storage })

module.exports = {
  createproductcontroller,
  getAllProductsController,
  getProductById,
  deleteProduct,
  updateProduct,
}
