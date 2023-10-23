const express = require('express')
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const { addToWishList, createProduct, deleteProduct, getProduct, getProducts, rating, updateProduct } = require('../controllers/productCtr')
const router = express.Router()

router.post("/", authMiddleware, isAdmin, createProduct)
router.get("/", getProducts)
router.put("/wishlist", authMiddleware, addToWishList)
router.put("/rating", authMiddleware, rating)
router.get("/:id", getProduct)
router.put("/:id", authMiddleware, isAdmin, updateProduct)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct)
module.exports = router
