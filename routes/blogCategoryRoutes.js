const express = require('express')
const router = express.Router()
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')

router.get('/')
router.post('/')
module.exports = router