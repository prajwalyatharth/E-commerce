import express from "express";
import { registerController, loginController, testController, forgotPasswordController } from '../controller/authController.js';
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//routing
//register post
router.post('/register', registerController);

//login || post
router.post('/login', loginController);

//forgot password post
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get('/test', requireSignin, isAdmin, testController);

//protected route auth
router.get('/user', requireSignin, (req, res) => {
    res.status(200).send({ ok: true });
});
//admin
router.get('/admin', requireSignin, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});



export default router;