const express = require('express')
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const { addToWishList, createProduct, deleteProduct, getProduct, getProducts, rating, updateProduct, uploadImages } = require('../controllers/productCtr')
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages')
const router = express.Router()


router.post("/", authMiddleware, isAdmin, createProduct)
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages)
router.put("/rating", authMiddleware, rating)
router.get("/", getProducts)
router.put("/wishlist", authMiddleware, addToWishList)
router.get("/:id", getProduct)

router.put("/:id", authMiddleware, isAdmin, updateProduct)

router.delete("/:id", authMiddleware, isAdmin, deleteProduct)

module.exports = router
