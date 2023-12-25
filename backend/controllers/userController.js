import asyncHandler from 'express-async-handler'
import User from './../models/userModel.js';
import generateToken from '../utils/generateToken.js';



// @desc Auth user/set token
// route POST /api/users/auth
// @acess Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        let userId = user._id
        generateToken(res, userId);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }

    res.status(200).json({ message: "Auth User" });
})

// @desc Register a new user
// route POST /api/users
// @acess Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExsists = await User.findOne({ email })

    if (userExsists) {
        res.status(400);
        throw new Error('User Already Exsists')
    }

    const user = await User.create({
        name, email, password
    })

    if (user) {
        let userId = user._id
        generateToken(res, { userId });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }

})

// @desc logout User
// route POST /api/users/logout
// @acess Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "User Logged Out" });
})

// @desc get User profile
// route GET /api/users/profile
// @acess Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user);
})

// @desc Update User profile
// route PUT /api/users/profile
// @acess Private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })


    } else {
        res.status(404);
        throw new Error('User Not Found')
    }

    res.status(200).json({ message: "Update User Profile" });
})



export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile }