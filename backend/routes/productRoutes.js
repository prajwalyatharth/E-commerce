import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productSearchController,
  relatedProductController,
  updateProductController,
} from "../controller/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// Create Product route
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);

//update route
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);

// Get All Products route
router.get("/get-product", getProductController); // Changed endpoint to be more descriptive

// Get Single Product route
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", getProductPhotoController);

//delete pridcut
router.delete("/delete-product/:pid", deleteProductController);

//routes for filter
router.post("/product-filter", productFilterController);

//routes for reloading when we scroll down load more products
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//product search
router.get("/search/:keyword", productSearchController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;
