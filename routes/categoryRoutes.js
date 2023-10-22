const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const { createCategory } = require('../controllers/categoryCtr')

router.post('/', createCategory)

module.exports = router