import express from 'express';
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getProductPhotoController, getSingleProductController, updateProductController } from '../controller/productController.js'; // Corrected function name
import formidable from 'express-formidable';

const router = express.Router();

// Create Product route
router.post('/create-product', requireSignin, isAdmin, formidable(), createProductController);

//update route
router.put('/update-product/:pid', requireSignin, isAdmin, formidable(), updateProductController);

// Get All Products route
router.get('/get-product', getProductController); // Changed endpoint to be more descriptive

// Get Single Product route
router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', getProductPhotoController);

//delete pridcut
router.delete('/delete-product/:pid', deleteProductController);

export default router;
