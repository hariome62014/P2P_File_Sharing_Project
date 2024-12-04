import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashBoard from './pages/DashBoard';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          {/* Login Route */}
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </>
      ) : (
        /* Dashboard Route */
        <Route path="/dashboard" element={<DashBoard setIsLoggedIn={setIsLoggedIn} />} />
      )}

      {/* Redirect based on login state */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />} />
    </Routes>
  );
};

export default App;
