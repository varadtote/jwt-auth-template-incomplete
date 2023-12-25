import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import cookieParser from 'cookie-parser';


const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password');

            next()
        } catch (error) {
            res.status(401);
            throw new Error("Invalid Token")
        }

    } else {
        res.status(401);
        throw new Error('Not Authorized, no token')
    }
})

export { protect }