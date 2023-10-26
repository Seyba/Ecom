const express = require('express')
const router = express.Router()
const { 
    adminLogin,
    blockUser,
    createUser, 
    deleteUser,
    getUser, 
    getUsers, 
    forgotPasswordToken,
    handleTokenRefresh,
    loginUserCtr, 
    logOut,
    resetPassword,
    unBlockUser,
    updateUser,
    updatePassword
} = require('../controllers/userCtr')
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')

router.put("/password",authMiddleware ,updatePassword)
router.post("/forgot-password-token", forgotPasswordToken)
router.post("/admin-login", adminLogin)
router.put("/reset-password/:token", resetPassword)
router.post("/register", createUser)
router.post("/login", loginUserCtr)
router.get("/logout", logOut)
router.get("/all-users", getUsers)
router.get("/refresh", handleTokenRefresh)
router.get("/:id", authMiddleware, isAdmin, getUser)
router.delete("/:id", deleteUser)
router.put("/edit-user", authMiddleware, updateUser)
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser)
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser)

module.exports = router