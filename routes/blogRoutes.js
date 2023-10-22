const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const {createBlog, updateBlog, getBlogs} = require('../controllers/blogCtr')

router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.get('/',  getBlogs)

module.exports = router