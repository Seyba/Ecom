const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const { createCategory, deleteCategory, getCategories, getCategory, updateCategory } = require('../controllers/prodCategoryCtr')

router.get('/', authMiddleware, isAdmin, getCategories)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.get('/:id', getCategory)
router.delete('/:id', deleteCategory)
module.exports = router