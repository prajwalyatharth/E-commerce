import express from 'express';
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controller/categoryController.js';



const router = express.Router()

//router
router.post('/create-category', requireSignin, isAdmin, createCategoryController);

//update category
router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController);

//get 
router.get('/get-category', categoryController);

//get single
router.get('/single-category/:slug', singleCategoryController);

//delete
router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoryController);





export default router;