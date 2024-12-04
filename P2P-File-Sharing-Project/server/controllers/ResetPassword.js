const User = require('../models/Users');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mailSender = require('../utils/mailSender')



// Forgot Password - Send OTP
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = Date.now() + 10 * 60 * 1000; 

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

       

        const mailResponse = await mailSender(
            email,
            "Verification Email",
            otp
          );

       if(mailResponse) res.status(200).json({success:true,
         message: 'OTP sent successfully' });
       else {
        res.status(500).json({
            success:false,
            message:"Error while sending the OTP"
        })
       }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ success:false,
                message: "Invalid or expired OTP" });
        }

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
