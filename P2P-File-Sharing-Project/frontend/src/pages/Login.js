import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



const Login = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();
  
const PORT= process.env.PORT || 4000;

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/auth/login`, {email,password});
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful');
      setIsLoggedIn(true);
      navigate('/dashboard'); // Redirect after login
    } catch (error) {
      console.log("Hello error");
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      console.log("Error:",errorMessage);
      toast.error(errorMessage);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>
        <div className='flex justify-between'>
        <div>
        <p className="text-sm text-gray-500 text-center mt-4">
          New Here?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
        </div>
          <div className='mt-4'>
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password
          </Link>
          </div>
        
       
        </div>
      </div>
    </div>
  );
};

export default Login;
