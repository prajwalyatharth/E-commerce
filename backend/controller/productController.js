import productModel from "../models/productModel.js";
import categoryModel from "../models/categorymodel.js";
import fs from "fs";
import slugify from "slugify";

//create prodcut
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
      await product.save();
    }
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product, // Fixed variable name
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error creating product",
    });
  }
};

// get all product
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All products",
      products, // Fixed variable name
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error getting products",
    });
  }
};

//get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Product details",
      product, // Fixed variable name
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error getting single product",
    });
  }
};

//get  product photo
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error getting photo",
    });
  }
};
//delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting product",
    });
  }
};

// update product
// export const updateProductController = async (req, res) => {
//     try {
//         const { name, slug, description, price, category, quantity, shipping } = req.fields;
//         const { photo } = req.files;

//         // Validation
//         switch (true) {
//             case !name:
//                 return res.status(400).send({ error: "Name is required" });
//             case !description:
//                 return res.status(400).send({ error: "Description is required" });
//             case !price:
//                 return res.status(400).send({ error: "Price is required" });
//             case !category:
//                 return res.status(400).send({ error: "Category is required" });
//             case !quantity:
//                 return res.status(400).send({ error: "Quantity is required" });
//             case photo && photo.size > 1000000:
//                 return res.status(400).send({ error: "Photo should be less than 1MB" });
//         }

//         const product = await productModel.findByIdAndUpdate(req.params.pid,
//             { ...req.fields, slug: slugify(name) }, { new: true })
//         if (photo) {
//             product.photo.data = fs.readFileSync(photo.path);
//             product.photo.contentType = photo.type;
//         }
//         await product.save();
//         res.status(201).send({
//             success: true,
//             message: 'Product updated successfully',
//             product, // Fixed variable name
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             error: error.message,
//             message: "error updating product",
//         });
//     }
// }
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(400).send({ message: "Name is required" });

      case !description:
        return res.status(400).send({ message: "Description is required" });

      case !price:
        return res.status(400).send({ message: "Price is required" });

      case !category:
        return res.status(400).send({ message: "Category is required" });

      case !quantity:
        return res.status(400).send({ message: "Quantity is required" });

      case photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ message: "Photo should be less than 1 MB" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true } // This ensures the updated document is returned
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
      await product.save();
    }

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};

//filter
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const product = await productModel.find(args);
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in filter",
      error,
    });
  }
};

//product reload
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in reload",
      error,
    });
  }
};

//show product per reload
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? parseInt(req.params.page) : 1; // Ensure it's a number
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products, // Ensure this key matches what frontend expects
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in loading products",
      error,
    });
  }
};

// Search product
export const productSearchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel // Fixed typo from resutls to results
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    console.log(req.params.keyword);

    res.json(results); // Fixed typo from resutls to results
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(4)
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

// get prodoct by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
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
