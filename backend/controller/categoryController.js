import categorymodel from "../models/categorymodel.js";
import slugify from "slugify";

// Create category controller
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({ message: "Name is required" }); // Changed status code to 400 (Bad Request)
        }

        const existingCategory = await categorymodel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: "Category already exists", // Set success to false if category exists
            });
        }

        const category = await new categorymodel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "Category created",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating category",
        });
    }
};

// Update category controller
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await categorymodel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }
};

// Get all categories controller
export const categoryController = async (req, res) => {
    try {
        const categories = await categorymodel.find({});
        res.status(200).send({
            success: true,
            message: "Categories fetched successfully",
            categories, // Changed variable to plural
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting categories",
        });
    }
};

// Get single category controller
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categorymodel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Single category fetched successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single category",
        });
    }
};

// Delete category controller
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categorymodel.findByIdAndDelete(id); // Changed to findByIdAndDelete
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category",
        });
    }
};
