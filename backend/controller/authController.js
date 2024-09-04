import bcrypt from 'bcrypt';
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

// Register Controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        // Validation
        if (!name) return res.status(400).send({ message: "Name is required" });
        if (!email) return res.status(400).send({ message: "Email is required" });
        if (!password) return res.status(400).send({ message: "Password is required" });
        if (!phone) return res.status(400).send({ message: "Phone is required" });
        if (!address) return res.status(400).send({ message: "Address is required" });
        if (!answer) return res.status(400).send({ message: "Answer is required" });

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered, please login',
            });
        }

        // Hash password and register user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ name, email, password: hashedPassword, answer, phone, address }).save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        });
    }
};

// Login Controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }

        // Compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "60d" });
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        });
    }
};
// forgot password
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "email is required" })
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "new password is required" })
        }
        // check 
        const user = await userModel.findOne({ email, answer })
        //valsidation 
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "liar"
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "password reset successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "something went wrong",
            error
        })
    }
};



// Test Controller
export const testController = (req, res) => {
    res.send('Protected route');
};


