import express from 'express';
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';
import { createProductController, getProductController, getSingleProductController } from '../controller/productController.js'; // Corrected function name
import formidable from 'express-formidable';

const router = express.Router();

// Create Product route
router.post('/create-product', requireSignin, isAdmin, formidable(), createProductController);

// Get All Products route
router.get('/get-product', getProductController); // Changed endpoint to be more descriptive

// Get Single Product route
router.get('/get-product/:slug', getSingleProductController);

export default router;
