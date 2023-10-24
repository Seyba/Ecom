const express = require('express')
const { createCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } = require('../controllers/couponCtr')
const router = express.Router()

router.post('/', createCoupon)
router.get('/', getCoupons)
router.get('/:id', getCoupon)
router.delete('/:id', deleteCoupon)
router.put('/:id', updateCoupon)
module.exports = router