const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const {createBlog} = require('../controllers/blogCtr')

router.post('/', authMiddleware, isAdmin, createBlog)

module.exports = router