const express = require('express')
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')
const {deleteImages, uploadImages } = require('../controllers/uploadCtr')
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages')
const router = express.Router()


router.post("/upload", authMiddleware, isAdmin, uploadPhoto.array("images", 10),productImgResize, uploadImages)

router.delete("/:id", authMiddleware, isAdmin, deleteImages)

module.exports = router
