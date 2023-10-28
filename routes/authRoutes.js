const express = require('express')
const router = express.Router()
const { 
    adminLogin,
    blockUser,
    createUser, 
    deleteUser,
    emptyCart,
    forgotPasswordToken,
    getUserCart,
    getUser, 
    getUsers, 
    getWishList,
    handleTokenRefresh,
    loginUserCtr, 
    logOut,
    resetPassword,
    saveAddress,
    unBlockUser,
    updateUser,
    updatePassword,
    userCart
} = require('../controllers/userCtr')
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')

router.put("/password",authMiddleware ,updatePassword)
router.post("/cart", authMiddleware, userCart)
router.post("/forgot-password-token", forgotPasswordToken)
router.post("/admin-login", adminLogin)
router.put("/reset-password/:token", resetPassword)
router.post("/register", createUser)
router.post("/login", loginUserCtr)
router.get("/logout", logOut)
router.delete("/empty-cart", authMiddleware, emptyCart)
router.get("/cart", authMiddleware, getUserCart)
router.get("/all-users", getUsers)
router.get("/refresh", handleTokenRefresh)
router.get("/wishlist", authMiddleware, getWishList)
router.put("/save-address", authMiddleware, saveAddress)
router.get("/:id", authMiddleware, isAdmin, getUser)
router.delete("/:id", deleteUser)
router.put("/edit-user", authMiddleware, updateUser)
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser)
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser)

module.exports = router