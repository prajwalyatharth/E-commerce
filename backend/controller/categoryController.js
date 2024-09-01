import categorymodel from "../models/categorymodel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: "name is required" })
        }
        const existingCategory = await categorymodel.findOne({ name })
        if (existingCategory) {
            res.status(200).send({
                success: true,
                message: "category already exist"
            })
        }
        const category = await new categorymodel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "category created",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in category"
        })
    }
}

//update 
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categorymodel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        req.status(200).send({
            success: true,
            message: "category updated successfully",
            category
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error while updating category"
        })
    }
}


//get 
export const categoryController = async (req, res) => {
    try {
        const category = await categorymodel.findOne({ slug: req.params.slug })
        req.status(200).send({
            success: true,
            message: "get single category list successfully",
            category
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error while getting category"
        })
    }
}

// sigle get
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categorymodel.find({})
        req.status(200).send({
            success: true,
            message: "category listed successfully",
            category
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error while getting single category"
        })
    }
}

//delete
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categorymodel.findById(id)
        req.status(200).send({
            success: true,
            message: "category deleted",
            category
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error while deleteing category"
        })
    }
}