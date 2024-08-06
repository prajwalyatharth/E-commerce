import express from "express";
import { registerController, loginController, testController } from '../controller/authController.js';


//router object
const router = express.Router();

//routing
//register post
router.post('/register', registerController);
router.post('/login', loginController);

//test routes
router.get('/test', testController);


export default router;