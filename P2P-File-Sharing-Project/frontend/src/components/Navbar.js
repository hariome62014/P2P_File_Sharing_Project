import React, { useState } from "react";
import './Navbar.css'
const Navbar = ({ setIsLoggedIn, isDarkTheme, setTheme }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      {/* Main Content */}
      <div className={`relative ${showLogoutModal ? "blur-background" : ""}`}>
        <nav className="absolute top-0 w-full bg-blue-500 text-white px-4 py-2 flex justify-between items-center shadow-lg">
          <h1 className="text-xl font-bold">PtoPTrans</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(isDarkTheme ? false : true)}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Change Theme
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-400"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
            <h3 className="text-xl font-bold mb-4">Please confirm to log out.</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
