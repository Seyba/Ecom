const express = require('express')
const router = express.Router()
const { 
    blockUser,
    createUser, 
    deleteUser,
    getUser, 
    getUsers, 
    loginUserCtr, 
    unBlockUser,
    updateUser 
} = require('../controllers/userCtr')
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')

router.post("/register", createUser)
router.post("/login", loginUserCtr)
router.get("/all-users", getUsers)
router.get("/:id", authMiddleware, isAdmin, getUser)
router.delete("/:id", deleteUser)
router.put("/edit-user", authMiddleware, updateUser)
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser)
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser)

module.exports = router