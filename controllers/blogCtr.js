const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbId')

const createBlog = asyncHandler(
    async(req, res) => {
        try{
            const newBlog = await Blog.create(req.body)
            res.json(newBlog)
        } catch(error){
            throw new Error(error)
        }
    }
)

const updateBlog = asyncHandler(
    async(req, res) => {
        const { id } = req.params
        try{
            const blog = await Blog.findByIdAndUpdate(id, req.body, {new: true})
            res.json(blog)
        } catch(error){
            throw new Error(error)
        }
    }
)

const getBlogs = asyncHandler(
    async(req, res) => {
        try{
            const blogs = await Blog.find({})
            res.json(blogs)
        } catch(error){
            throw new Error(error)
        }
    }
)

module.exports = { createBlog, getBlogs, updateBlog }