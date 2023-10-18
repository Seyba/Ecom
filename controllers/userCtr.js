const { generateToken } = require('../config/jwttoken')
const {generateNewToken} = require('../config/refreshToken')
const User = require('../models/userModel')
const {validateMongoDbId} = require('../utils/validateMongodbId')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')


const createUser = asyncHandler(
    async (req, res) => {
    
        const email = req.body.email
        const user = await User.find({email})
    
        if(!user.length){
            //* Create one
            const newUser = User.create(req.body)
            res.json(newUser)
        } else {
            //* User already exist
            throw new Error(
                "An Account is Associated With this Email!!"
            )
            // res.json({
            //     msg: "An Account is Associated With this Email!!",
            //     success: false
            // })
        }
    
    }
)

//* Log In the user
const loginUserCtr = asyncHandler(
    async(req, res)=> {
        const { email, password} = req.body

        //* check for user
        const user = await User.findOne({email})

        if(user && user.isPasswordMatched(password)){
            const refreshToken = await generateNewToken(user?._id)
            const updateUser = await User.findByIdAndUpdate(
                user._id, 
                {refreshToken: refreshToken}, 
                {new: true}
            )

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000
            })
            res.json({
                _id: user?._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                mobile: user.mobile,
                token: generateToken(user?._id)
            })
        } else {
            throw new Error('Invalid Credentials')
        }
    }
)

//* Log Out the User
const logOut = asyncHandler(
    async(req, res) => {
        const cookie = req.cookies
        if(!cookie?.refreshToken) throw new Error('No new Token in Cookies!')

        const refreshToken = cookie.refreshToken
        const user = await User.findOne({refreshToken})

        if(!user) {
            res.clearCookie("resfreshToken", {
                httpOnly: true,
                secure: true
            })
            return res.sendStatus(204)//* Forbidden
        }
        await User.findOneAndUpdate({refreshToken}, {
            refreshToken: ""
        })
        res.clearCookie("resfreshToken", {
            httpOnly: true,
            secure: true
        })
        return res.sendStatus(204)//* Forbidden
    }
)

//* Read all the users
const getUsers = asyncHandler(
    async (req, res) => {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            throw new Error(error)
        }
    }
)

//* Read a single user
const getUser = asyncHandler(
    async (req, res) => {
        const { id } = req.params
        try {
            const user = await User.findById(id)
            res.json(user)
        }catch(e){
            throw new Error(error)
        }

    }
)

//* Update user
const updateUser = asyncHandler(
    async(req, res) => {
        const {_id} = req.user
        validateMongoDbId(_id)
        try{
            const findUser = await User.findByIdAndUpdate(_id, req.body, {new: true})
            res.json(findUser)
        }catch(e){
            throw new Error(error)
        }
    }
)

//* Delete user
const deleteUser = asyncHandler(
    async(req, res) => {
        const {id} = req.params
        validateMongoDbId(id)
        try{
            const user = await User.findByIdAndDelete(id)
            res.json(user)
        }catch(e){
            throw new Error(error)
        }
    }
)

//* Block User
const blockUser = asyncHandler(
    async(req, res) => {
        const { id } = req.params
        validateMongoDbId(id)
        try {
            const userBlocked = await User.findByIdAndUpdate(id, {isBlocked: true}, {new: true})
            res.json({
                message: 'User is Blocked!'
            })
        } catch (error) {
            throw new Error(error)
        }
    }
)

//* Unblock User
const unBlockUser = asyncHandler(
    async(req, res) => {
        const { id } = req.params
        validateMongoDbId(id)
        try {
            const userUnlocked = await User.findByIdAndUpdate(id, {isBlocked: false}, {new: true})
            res.json({
                message: 'User is Unblocked!'
            })
        } catch (error) {
            throw new Error(error)
        }
    }
)

//* Refresh User Token
const handleTokenRefresh = asyncHandler(
    async (req, res) => {
        const cookie = req.cookies
        if(!cookie?.refreshToken) throw new Error("No new Token in Cookies!")
        const refreshToken = cookie.refreshToken
        const user = await User.findOne({refreshToken})

        if(!user) throw new Error("No new token found in DB!")

        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if(err || user.id !== decoded.id) {
                throw new Error("Something is wrong with the new token.")
            }
            const accessToken = generateToken(user?._id)
            res.json({accessToken})
        })
    }
)
module.exports = {
    blockUser,
    createUser, 
    deleteUser,
    getUser, 
    getUsers, 
    handleTokenRefresh,
    loginUserCtr, 
    logOut,
    unBlockUser,
    updateUser
}