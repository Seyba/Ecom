const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

const createProduct = asyncHandler(
    async(req, res) => {
        try {
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
            const prods = await Product.find()

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


module.exports = {createProduct,getProduct, getProducts}