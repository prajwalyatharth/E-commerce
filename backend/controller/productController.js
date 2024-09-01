import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from 'slugify';

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
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
        }
        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
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
}

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({})
            .populate('category')
            .select('-photo')
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: 'All products',
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
}

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug })
            .populate('category')
            .select('-photo');
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Product details',
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
}
