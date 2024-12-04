const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/Users');
const mailSender = require('../utils/mailSender');

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY; // Use a secure key in production

// OTP Storage (Temporary)
const otpStore = new Map(); // Map { email => { otp, expiry } }

// Login Route
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'User does not exist. Try registering.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// User Validation
exports.userValidation = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already registered. Try logging in.' });
        }

        const createdOtp = crypto.randomBytes(3).toString('hex'); // Secure OTP generation
        const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

        // Store OTP and expiry in otpStore
        otpStore.set(email, { otp: createdOtp, expiry: otpExpiry });

        // Send email
        const mailResponse = await mailSender(email, 'Verification Email', createdOtp);

        if (!mailResponse) {
            return res.status(500).json({ success: false, message: 'Error while sending the OTP.' });
        }

        res.status(200).json({ success: true, message: 'OTP sent to your email.' });
    } catch (err) {
        console.error('User Validation Error:', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Signup
exports.Signup = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        if (!email || !otp || !password) {
            return res.status(400).json({ success: false, message: 'Email, OTP, and password are required.' });
        }

        const storedData = otpStore.get(email);

        if (!storedData) {
            return res.status(400).json({ success: false, message: 'OTP not found. Request a new one.' });
        }

        const { otp: storedOtp, expiry: storedExpiry } = storedData;

        if (storedOtp !== otp || storedExpiry < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        otpStore.delete(email); // Clean up OTP data

        res.status(201).json({ success: true, message: 'User created successfully.' });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
