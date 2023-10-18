const { generateToken } = require('../config/jwttoken')
const User = require('../models/userModel')
const {validateMongoDbId} = require('../utils/validateMongodbId')
const asyncHandler = require('express-async-handler')

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

//* Log the user
const loginUserCtr = asyncHandler(
    async(req, res)=> {
        const { email, password} = req.body

        //* check for user
        const user = await User.findOne({email})

        if(user && user.isPasswordMatched(password)){
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

module.exports = {
    blockUser,
    createUser, 
    deleteUser,
    getUser, 
    getUsers, 
    loginUserCtr, 
    unBlockUser,
    updateUser
}