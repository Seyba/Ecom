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
        validateMongoDbId(id)
        try{
            const blog = await Blog.findByIdAndUpdate(id, req.body, {new: true})
            res.json(blog)
        } catch(error){
            throw new Error(error)
        }
    }
)

const getBlog = asyncHandler(
    async(req, res) => {
        const { id } = req.params
        validateMongoDbId(id)
        try{
            const blog = await Blog.findById(id)
            const updateViews = await Blog.findByIdAndUpdate(
                id,
                {$inc: {numViews: 1}},
                {new: true}
            )
            res.json({blog, updateViews})
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

const deleteBlog = asyncHandler(
    async(req, res) => {
        const { id } = req.params
        validateMongoDbId(id)

        try{
            const blog = await Blog.findByIdAndDelete(id)
            res.json({msg:'blog deleted'})
        } catch(error){
            throw new Error(error)
        }
    }
)

const likeBlog = asyncHandler(
    async(req, res) => {
        const { blogId } = req.body
        validateMongoDbId(blogId) 
        
        try{
            //* find blog to be liked
            const blog = await Blog.findByIdAndDelete(blogId)
            
            //* find logged user
            const loggedUserId = req?.user?._id
            
            //* find if user has liked the post
            const isLiked = blog?.isLiked

            //* find if user has liked the post
            const alreadyDisliked = blog?.dislikes?.find(
                (userId = userId?.toString() === loggedUserId?.toString())
            )

            if(alreadyDisliked) {
                const blog = await Blog.findByIdAndUpdate(blogId, {
                    $pull: {dislikes: loggedUserId},
                    isDisliked: false
                },{
                    new: true
                })
                res.json(blog)
            }

            if(isLiked) {
                const blog = await Blog.findByIdAndUpdate(blogId, {
                    $pull: {likes: loggedUserId},
                    isLiked: false
                },{
                    new: true
                })
                res.json(blog)
            } else {
                const blog = await Blog.findByIdAndUpdate(blogId, {
                    $push: {likes: loggedUserId},
                    isLiked: true
                },{
                    new: true
                })
                res.json(blog)
            }

            res.json({msg:'blog deleted'})
        } catch(error){
            throw new Error(error)
        }
    }
)

module.exports = { createBlog, deleteBlog, getBlog, getBlogs, likeBlog, updateBlog }