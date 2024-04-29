const express=require('express');
const router=express.Router();
const {login,signup}=require('../controllers/Auth');
const {resetPasswordToken,resetPassword}=require('../controllers/ForgotPassword')
router.post('/login',login);
router.post('/signup',signup);
// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)
module.exports=router;