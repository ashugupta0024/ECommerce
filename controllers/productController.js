import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";

dotenv.config();

//Payment Gateway
var gateway = new braintree.BraintreeGateway({
	environment: braintree.Environment.Sandbox,
	merchantId: process.env.BRAINTREE_MERCHANT_ID,
	publicKey: process.env.BRAINTREE_PUBLIC_KEY,
	privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//Create New Product
export const createProductController = async (req, res) => {
	try {
		const { name, slug, description, price, category, quantity, shipping } =
			req.fields; //Formidable ki help se
		const { photo } = req.files;

		//Validation
		switch (true) {
			case !name:
				return res.status(500).send({ error: "Name is Required" });
			case !description:
				return res.status(500).send({ error: "Description is Required" });
			case !price:
				return res.status(500).send({ error: "Price is Required" });
			case !category:
				return res.status(500).send({ error: "Category is Required" });
			case !quantity:
				return res.status(500).send({ error: "Quantity is Required" });
			case photo && photo.size > 1000000:
				return res
					.status(500)
					.send({ error: "photo is Required and should be less then 1mb" });
		}

		const products = new ProductModel({ ...req.fields, slug: slugify(name) });
		if (photo) {
			products.photo.data = fs.readFileSync(photo.path);
			products.photo.contentType = photo.type;
		}
		await products.save();
		res.status(201).send({
			success: true,
			message: "Product Created Successfully",
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			error,
			message: "Error in creating product",
		});
	}
};

//Get all Products Controller
export const getProductController = async (req, res) => {
	try {
		//Unlimited products ho sake hai humne sirf sort karke 12 liye hai
		const products = await ProductModel.find({})
			.populate("category")
			.select("-photo")
			.limit(12)
			.sort({ createdAt: -1 }); //Photo bhi access ki toh request ka size bahut badh jaega isliy hata diya hai use
		res.status(200).send({
			success: true,
			counTotal: products.length,
			message: "All products",
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in getting all products",
			error: error.message,
		});
	}
};

//Get Single Product
export const getSingleProductController = async (req, res) => {
	try {
		const product = await ProductModel.findOne({ slug: req.params.slug })
			.select("-photo")
			.populate("category");
		res.status(200).send({
			success: true,
			message: "Desired Product found",
			product,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in getting the desired product",
			error: error.message,
		});
	}
};

// Get the photo of the product
export const productPhotoController = async (req, res) => {
	try {
		const product = await ProductModel.findById(req.params.pid).select("photo");
		if (product.photo.data) {
			res.set("Content-type", product.photo.contentType);
			return res.status(200).send(product.photo.data);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in getting the photo of desired product",
			error: error.message,
		});
	}
};

//Delete Product
export const deleteProductController = async (req, res) => {
	try {
		await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
		res.status(200).send({
			success: true,
			message: "Product Deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error while deleting product",
			error,
		});
	}
};

//Update Product
export const updateProductController = async (req, res) => {
	try {
		const { name, slug, description, price, category, quantity, shipping } =
			req.fields; //Formidable ki help se
		const { photo } = req.files;

		//Validation
		switch (true) {
			case !name:
				return res.status(500).send({ error: "Name is Required" });
			case !description:
				return res.status(500).send({ error: "Description is Required" });
			case !price:
				return res.status(500).send({ error: "Price is Required" });
			case !category:
				return res.status(500).send({ error: "Category is Required" });
			case !quantity:
				return res.status(500).send({ error: "Quantity is Required" });
			case photo && photo.size > 1000000:
				return res
					.status(500)
					.send({ error: "photo is Required and should be less then 1mb" });
		}

		const products = await ProductModel.findByIdAndUpdate(
			req.params.pid,
			{ ...req.fields, slug: slugify(name) },
			{ new: true }
		);
		if (photo) {
			products.photo.data = fs.readFileSync(photo.path);
			products.photo.contentType = photo.type;
		}
		await products.save();
		res.status(201).send({
			success: true,
			message: "Product Updated Successfully",
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			error,
			message: "Error in updating product",
		});
	}
};

//Filter Product
export const productFilterController = async (req, res) => {
	try {
		const { checked, radio } = req.body;
		let args = {};
		if (checked.length > 0) args.category = checked;
		if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }; //lte = less than equal to //gte = greater ....
		const products = await ProductModel.find(args);
		res.status(200).send({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error While Filtering Products",
			error,
		});
	}
};

//Get Product Count
export const productCountController = async (req, res) => {
	try {
		const total = await ProductModel.find({}).estimatedDocumentCount();
		res.status(200).send({
			success: true,
			total,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			message: "Error in product count",
			error,
			success: false,
		});
	}
};

// Get Product List base on page
export const productListController = async (req, res) => {
	try {
		const perPage = 6;
		const page = req.params.page ? req.params.page : 1;
		const products = await ProductModel.find({})
			.select("-photo")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.sort({ createdAt: -1 });
		res.status(200).send({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "error in per page ctrl",
			error,
		});
	}
};

//Search Product
export const searchProductController = async (req, res) => {
	try {
		const { keyword } = req.params;
		const results = await ProductModel.find({
			$or: [
				{ name: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
			],
		}).select("-photo");
		res.json(results);
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error In Search Product API",
			error,
		});
	}
};

//Similar Products
export const relatedProductController = async (req, res) => {
	try {
		const { pid, cid } = req.params;
		const products = await ProductModel.find({
			category: cid,
			_id: { $ne: pid },
		})
			.select("-photo")
			.limit(3)
			.populate("category");
		res.status(200).send({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "error while geting related product",
			error,
		});
	}
};

//Category wise products
export const categoryProductController = async (req, res) => {
	try {
		const category = await CategoryModel.findOne({ slug: req.params.slug });
		const products = await ProductModel.find({ category }).populate("category");
		res.status(200).send({
			success: true,
			category,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			error,
			message: "Error While Getting products",
		});
	}
};

//Payment Gateway API

//Token Verify
export const braintreeTokenController = async (req, res) => {
	try {
		gateway.clientToken.generate({}, function (err, response) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(response);
			}
		});
	} catch (error) {
		console.log(error);
	}
};

//Payment
export const brainTreePaymentController = async (req, res) => {
	try {
		const { nonce, cart } = req.body;
		let total = 0;
		cart.map((i) => {
			total += i.price;
		});
		let newTransaction = gateway.transaction.sale(
			{
				amount: total,
				paymentMethodNonce: nonce,
				options: {
					submitForSettlement: true,
				},
			},
			function (error, result) {
				if (result) {
					const order = new orderModel({
						products: cart,
						payment: result,
						buyer: req.user._id,
					}).save();
					res.json({ ok: true });
				} else {
					res.status(500).send(error);
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
};
