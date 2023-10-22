const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const { createCategory } = require('../controllers/prodCategoryCtr')

router.post('/', createCategory)

module.exports = router