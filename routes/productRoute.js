const express = require('express')
const { createProduct, getProduct, getProducts } = require('../controllers/productCtr')
const router = express.Router()

router.post("/", createProduct)
router.get("/", getProducts)
router.get("/:id", getProduct)
module.exports = router