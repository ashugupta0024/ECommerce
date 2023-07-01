import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
	createProductController,
	deleteProductController,
	getProductController,
	getSingleProductController,
	productPhotoController,
    updateProductController,
} from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";
const router = express.Router();

//routes

//Create Product
router.post(
	"/create-product",
	requireSignIn,
	isAdmin,
	ExpressFormidable(),
	createProductController
);

//Get All Products
router.get("/get-product", getProductController);

//Get Single Product
router.get("/get-product/:slug", getSingleProductController);

//Get Photo of Product
router.get("/product-photo/:pid", productPhotoController);

//Delete Product
router.delete("/delete-product/:pid", deleteProductController);

//Update Product
router.put(
	"/update-product/:pid",
	requireSignIn,
	isAdmin,
	ExpressFormidable(),
	updateProductController
);


export default router;
