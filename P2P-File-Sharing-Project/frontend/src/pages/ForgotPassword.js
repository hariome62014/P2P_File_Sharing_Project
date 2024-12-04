import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleSendOTP = async () => {
        try {
            await axios.post('http://localhost:8000/change-password/forgot-password', { email });
            setStep(2);
            toast.success("OTP send to your email");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const handleVerifyOTP = async () => {
        try {
            await axios.post('http://localhost:8000/change-password/verify-otp', { email, otp });
            setStep(3);
            toast.success("OTP verified successfully");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const handleResetPassword = async () => {
        // Check if passwords match
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        
        try {
            await axios.post('http://localhost:8000/change-password/reset-password', { email, newPassword });
            toast.success("Password reset successfully");
            setStep(1);
            setEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword(''); // Reset confirm password field
            navigate('/login');
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                {step === 1 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Forgot Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                        />
                        <button
                            onClick={handleSendOTP}
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        >
                            Send OTP
                        </button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Enter OTP</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                        />
                        <button
                            onClick={handleVerifyOTP}
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        >
                            Verify OTP
                        </button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Reset Password</h2>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                        />
                        <button
                            onClick={handleResetPassword}
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        >
                            Reset Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
