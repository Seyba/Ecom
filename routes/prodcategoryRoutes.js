const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const { createCategory, updateCategory } = require('../controllers/prodCategoryCtr')

router.post('/', createCategory)
router.put('/:id', updateCategory)
module.exports = router