const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const {createBlog, deleteBlog, dislikeBlog, getBlog, getBlogs, likeBlog, updateBlog} = require('../controllers/blogCtr')

router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/likes', authMiddleware, isAdmin, likeBlog)
router.put('/dislikes', authMiddleware, isAdmin, dislikeBlog)

router.get('/',  getBlogs)
router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.get('/:id', authMiddleware, getBlog)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)


module.exports = router