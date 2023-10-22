const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const {createBlog, deleteBlog, updateBlog,getBlog, getBlogs} = require('../controllers/blogCtr')

router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.get('/',  getBlogs)
router.get('/:id', authMiddleware, getBlog)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)


module.exports = router