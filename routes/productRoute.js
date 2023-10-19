const express = require('express')
const {isAdmin} = require('../middlewares/authMiddleware')
const { createProduct, deleteProduct, getProduct, getProducts, updateProduct } = require('../controllers/productCtr')
const router = express.Router()

router.post("/", isAdmin, createProduct)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.put("/:id", isAdmin, updateProduct)
router.delete("/:id", isAdmin, deleteProduct)
module.exports = router