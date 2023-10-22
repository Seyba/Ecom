const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const {validateMongoDbId} = require('../utils/validateMongodbId')

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
            const blog = await Blog.findById(id).populate('likes')
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
        const {postId}  = req.body
        validateMongoDbId(postId) 
        
        //* find blog to be liked
        const blog = await Blog.findById(postId)
        
        //* find logged user
        const loggedUserId = req?.user?._id
        
        //* find if user has liked the post
        const isLiked = blog?.isLiked

        //* find if user has liked the post
        const alreadyDisliked = blog?.disLikes?.find(
            (userId => userId?.toString() === loggedUserId?.toString())
        )

        if(alreadyDisliked) {
            const blog = await Blog.findByIdAndUpdate(postId, {
                $pull: {dislikes: loggedUserId},
                isDisliked: false
            },{
                new: true
            })
            res.json(blog)
        }

        if(isLiked) {
            const blog = await Blog.findByIdAndUpdate(postId, {
                $pull: {likes: loggedUserId},
                isLiked: false
            },{
                new: true
            })
            res.json(blog)
        } else {
            const blog = await Blog.findByIdAndUpdate(postId, {
                $push: {likes: loggedUserId},
                isLiked: true
            },{
                new: true
            })
            res.json(blog)
        }

    }
)


const dislikeBlog = asyncHandler(
    async(req, res) => {
        const {postId}  = req.body
        validateMongoDbId(postId) 
        
        //* find blog to be liked
        const blog = await Blog.findById(postId)
        
        //* find logged user
        const loggedUserId = req?.user?._id
        
        //* find if user has liked the post
        const isDisliked = blog?.isDisliked

        //* find if user has liked the post
        const alreadyLiked = blog?.likes?.find(
            (userId => userId?.toString() === loggedUserId?.toString())
        )

        if(alreadyLiked) {
            const blog = await Blog.findByIdAndUpdate(postId, {
                $pull: {likes: loggedUserId},
                isLiked: false
            },{
                new: true
            })
            res.json(blog)
        }

        if(isDisliked) {
            const blog = await Blog.findByIdAndUpdate(postId, {
                $pull: {disLikes: loggedUserId},
                isDisliked: false
            },{
                new: true
            })
            res.json(blog)
        } else {
            const blog = await Blog.findByIdAndUpdate(postId, {
                $push: {disLikes: loggedUserId},
                isDisliked: true
            },{
                new: true
            })
            res.json(blog)
        }

    }
)

module.exports = { createBlog, deleteBlog, dislikeBlog, getBlog, getBlogs, likeBlog, updateBlog }