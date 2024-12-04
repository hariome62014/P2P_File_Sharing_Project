const express = require('express');
const { forgotPassword, verifyOTP, resetPassword } = require('../controllers/ResetPassword');
const router = express.Router();

router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

module.exports = router;
