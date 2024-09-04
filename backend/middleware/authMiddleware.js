// import jwt from 'jsonwebtoken';
// import userModel from '../models/userModel.js';


// //protected route toekn base

// export const requireSignin = (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader) {
//             return res.status(401).send({
//                 success: false,
//                 message: "Authorization header missing"
//             });
//         }

//         // Extract the token part (after "Bearer ")
//         const token = authHeader.split(" ")[1];
//         if (!token) {
//             return res.status(401).send({
//                 success: false,
//                 message: "Token missing from Authorization header"
//             });
//         }

//         // Verify the token
//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decode;  // Attach the decoded token to the request
//         next();  // Continue to the next middleware or route handler
//     } catch (error) {
//         console.log(error);
//         return res.status(401).send({
//             success: false,
//             message: "Invalid or expired token"
//         });
//     }
// };




// //admin access
// export const isAdmin = async (req, res, next) => {
//     try {
//         const user = await userModel.findById(req.user._id);
//         if (user.role !== 1) {
//             return res.status(401).send({
//                 success: false,
//                 message: "unauthorized access"
//             });
//         } else {
//             next();
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(401).send({
//             success: false,
//             message: "error in middleware"
//         });
//     }
// };

const JWT = require("jsonwebtoken");

const userModel = require('../models/userModel')
//protected Routes from the base

const requireSignIn = async (req, res, next) => {
    console.log("require sigin");
    try {
        console.log(req.headers.authorization)
        const decode = JWT.verify(req.headers.authorization, 'PRATYUSH1569');
        req.user = decode;
        next();

    } catch (error) {
        console.log(error);
    }
};

const isAdmin = async (req, res, next) => {
    console.log("is Admin");

    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'unauthorized access',
            })
        } else {
            console.log("Next after admin");
            next();
            console.log("completed next");

        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware",
        })
    }

}
module.exports = { requireSignIn, isAdmin };