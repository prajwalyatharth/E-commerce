import { jwt } from 'jsonwebtoken';

//protected route toekn base
export const requireSignin = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authoriztion, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.log(error)
    }
}