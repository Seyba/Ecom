const express = require('express')
const { createProduct } = require('../controllers/productCtr')
const router = express.Router()

router.post("/", createProduct)
module.exports = router