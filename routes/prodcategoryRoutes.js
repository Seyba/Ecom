const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const { createCategory,deleteCategory, updateCategory } = require('../controllers/prodCategoryCtr')

router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)
module.exports = router