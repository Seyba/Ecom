const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const { createEnquiry, deleteEnquiry, getEnquiries, getEnquiry } = require('../controllers/enqCtr')
router.get('/', getEnquiries)
router.post('/', authMiddleware, createEnquiry)
router.get('/:id', getEnquiry)
router.delete('/:id', authMiddleware, isAdmin, deleteEnquiry)

module.exports = router