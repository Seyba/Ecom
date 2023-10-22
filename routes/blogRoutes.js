const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const {createBlog, deleteBlog, getBlog, getBlogs, likeBlog, updateBlog} = require('../controllers/blogCtr')

router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.get('/',  getBlogs)
router.get('/:id', authMiddleware, getBlog)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)
router.get('/', authMiddleware, isAdmin, likeBlog)


module.exports = router