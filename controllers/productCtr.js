const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(
    async(req, res) => {
        try {
            if(req.body.title){
                req.body.slug = slugify(req.body.title)
            }
            const newProduct = await Product.create(req.body)

            res.json(newProduct)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const getProducts = asyncHandler(
    async(req, res) => {
        try {
            //* filtering
            const queryObj = {...req.query}
            const excludeFields = ['page', 'sort', 'limit','fields']
            excludeFields.map(el => delete queryObj[el])

            let queryStr = JSON.stringify(queryObj)
            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

            let query = Product.find(JSON.parse(queryStr))
            
            //* sorting
            if(req.query.sort){
                const sortBy = req.query.sort.split(",").join(" ")
                query = query.sort(sortBy)
            } else {
                query = query.sort('-createdAt')
            }

            //* Limiting the fields
            if(req.query.fields) {
                const fields = req.query.fields.split(",").join(" ")
                query = query.select(fields)
            } else {
                query = query.select("-v__")
            }

            //* Pagination
            const page = req.query.page
            const limit = req.query.limit
            const skip = (page - 1) * limit
            console.log(page, limit, skip)
            query = query.skip(skip).limit(limit)
            if(req.query.page) {
                const prodCount = await Product.countDocuments()
                if(skip >= prodCount) throw new Error("This page does not exist!")
            }
            const prods = await query
            res.json(prods)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const getProduct = asyncHandler(
    async(req, res) => {
        const { id } = req.params
        try {
            const prod = await Product.findById(id)
            res.json(prod)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const updateProduct = asyncHandler(
    async(req, res) => {
        const { id } = req.params
        try {
            if(req.body.title) {
                req.body.slug = slugify(req.body.title)
            }
            const updateProd = await Product.findByIdAndUpdate(id, req.body, {new: true})
            res.json(updateProd)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const deleteProduct = asyncHandler(
    async(req, res) => {
        const { id } = req.params
        try {
            const updateProd = await Product.findByIdAndDelete(id)
            res.json({msg: 'Product Deleted'})
        } catch (error) {
            throw new Error(error)
        }
        
    }
)


module.exports = {createProduct,deleteProduct, getProduct, getProducts, updateProduct}