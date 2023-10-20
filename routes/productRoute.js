const express = require('express')
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const { createProduct, deleteProduct, getProduct, getProducts, updateProduct } = require('../controllers/productCtr')
const router = express.Router()

router.post("/", authMiddleware, isAdmin, createProduct)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.put("/:id", authMiddleware, isAdmin, updateProduct)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct)
module.exports = router