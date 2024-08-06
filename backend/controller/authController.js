import { compare } from "bcrypt";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

// Example usage
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');



export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        //validation 
        if (!name) {
            return res.send({ error: " name is required" })
        }
        if (!email) {
            return res.send({ error: "email is required" })
        }
        if (!password) {
            return res.send({ error: " password is required" })
        }
        if (!phone) {
            return res.send({ error: "phone is required" })
        }
        if (!address) {
            return res.send({ error: " address is required" })
        }

        //check user email
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'already register please login',

            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = await new userModel({ name, email, password: hashedPassword, phone, address }).save()

        res.status(201).send({
            success: true,
            message: 'user register successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in Registration ',
            error
        })
    }
};

//post login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "invalid email or password"
            })
        }
        // check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "email is not registered"
            })
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "password is invalid"
            })
        }

        //token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).send({
            success: true,
            message: "login succesfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in login",
            error
        })

    }
}

//test controller 
export const testController = (req, res) => {
    res.send('protected route');
}