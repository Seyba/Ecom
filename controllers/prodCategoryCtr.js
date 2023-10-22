const ProductCategory = require('../models/ProdCategoryModel')
const asyncHandler = require('express-async-handler')
const {validateMongoDbId} = require('../utils/validateMongodbId')

const createCategory = asyncHandler(
    async(req, res) => {
        try {
            const newCat = await ProductCategory.create(req.body)
            res.json(newCat)
        } catch (error) {
            throw new Error(error)
        }
    }
)

module.exports = {createCategory}