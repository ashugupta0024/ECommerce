import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import fs from "fs";

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
export const getProductController = async(req,res) => {
    try{                                                                                             //Unlimited products ho sake hai humne sirf sort karke 12 liye hai
        const products = await ProductModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1}) //Photo bhi access ki toh request ka size bahut badh jaega isliy hata diya hai use
        res.status(200).send({
            success: true,
            counTotal: products.length,
            message: 'All products',
            products
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting all products',
            error: error.message
        })
    }
}

//get Single Product
export const getSingleProductController = async(req,res) => {
    try{     
        const product = await ProductModel.findOne({slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: 'Desired Product found',
            product,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting the desired product',
            error: error.message
        })
    }
}

// get the photo of the product
export const productPhotoController = async(req,res) => {
    try{     
        const product = await ProductModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting the photo of desired product',
            error: error.message
        })
    }
}

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

		const products = await ProductModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true});
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