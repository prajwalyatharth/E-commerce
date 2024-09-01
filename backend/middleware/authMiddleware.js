import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';


//protected route toekn base

export const requireSignin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Authorization header missing"
            });
        }

        // Extract the token part (after "Bearer ")
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Token missing from Authorization header"
            });
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;  // Attach the decoded token to the request
        next();  // Continue to the next middleware or route handler
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Invalid or expired token"
        });
    }
};




//admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "unauthorized access"
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "error in middleware"
        });
    }
};
