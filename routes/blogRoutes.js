const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const {createBlog, updateBlog,getBlog, getBlogs} = require('../controllers/blogCtr')

router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.get('/',  getBlogs)
router.get('/:id', authMiddleware, isAdmin, getBlog)


module.exports = router