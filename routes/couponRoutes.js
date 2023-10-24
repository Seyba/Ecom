const express = require('express')
const { createCoupon } = require('../controllers/couponCtr')
const router = express.Router()

router.post('/', createCoupon)

module.exports = router