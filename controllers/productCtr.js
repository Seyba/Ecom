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
            const prods = await Product.find(req.query)

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