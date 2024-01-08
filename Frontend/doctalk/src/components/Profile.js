import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg'; 

const Profile = ({ username }) => {
    const [user] = useState({
        username: username || 'Guest',
        // Add more user details as needed (e.g., photo)
      });
    
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    
      const handleLogout = () => {
        // Handle logout functionality (e.g., clear session, redirect, etc.)
        // Example: call a logout function or clear user data
        console.log('Logging out...');
      };

  return (
    <div className="relative">
      {/* Profile icon */}
      <CgProfile
        size={24} // Set the size of the icon (adjust as needed)
        className="text-blue-500 cursor-pointer"
        onClick={toggleDropdown}
      />
{/* Dropdown menu */}
{isDropdownOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
          <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
            Account
          </div>
          <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
            Settings
          </div>
          <div
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;