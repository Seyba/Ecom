const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const { createCategory, deleteCategory, getCategories, updateCategory } = require('../controllers/prodCategoryCtr')

router.get('/', getCategories)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)
module.exports = router