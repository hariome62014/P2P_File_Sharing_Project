const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true, // Ensures email addresses are unique
            trim: true,
            lowercase: true, // Converts email to lowercase
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email address', // Validation for email format
            ],
        },
        password: {
            type: String,
            required: true,
            minlength: 6, // Ensures a minimum password length
        },
        otp: { 
            type: String 
        },
        otpExpiry: { type: Date },
    },
    
    {
        timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
    }
);

module.exports = mongoose.model('User', userSchema);
