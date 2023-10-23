const Coupon = require('../models/couponModel')
const asyncHandler = require('express-async-handler')
const {validateMongoDbId} = require('../utils/validateMongodbId')

const createCoupon = asyncHandler(
    async(req, res) => {
        try {
            const newCoupon = await Coupon.create(req.body)
            res.json(newCoupon)
        } catch (error) {
            throw new Error(error)
        }
    }
)

// const updateBrand = asyncHandler(
//     async(req, res) => {
//         const { id } = req.params
//         try {
//             const category = await Brand.findByIdAndUpdate(id, req.body, {new: true})
//             res.json(category)
//         } catch (error) {
//             throw new Error(error)
//         }
//     }
// )

// const deleteBrand = asyncHandler(
//     async(req, res) => {
//         const { id } = req.params
//         try {
//             const category = await Brand.findByIdAndDelete(id)
//             res.json({msg: "Category deleted!"})
//         } catch (error) {
//             throw new Error(error)
//         }
//     }
// )
// const getBrands = asyncHandler(
//     async(req, res) => {
//         try {
//             const categories = await Brand.find({})
//             res.json(categories)
//         } catch (error) {
//             throw new Error(error)
//         }
//     }
// )

// const getBrand = asyncHandler(
//     async(req, res) => {
//         const { id } = req.params
//         try {
//             const category = await Brand.findById(id)
//             res.json(category)
//         } catch (error) {
//             throw new Error(error)
//         }
//     }
// )


module.exports = {createCoupon, }//deleteBrand, getBrands, getBrand, updateBrand}