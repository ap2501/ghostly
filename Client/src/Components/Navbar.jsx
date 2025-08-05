import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo/Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-4xl font-extrabold">
              <span className="text-yellow-300">Ghost</span><span className="text-pink-400">Ly</span>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
            <Link to="/profile" className="hover:text-yellow-300 transition-colors">Profile</Link>
            <Link to="/send" className="hover:text-yellow-300 transition-colors ">Send Message</Link>
            <Link to="/about" className="hover:text-yellow-300 transition-colors">About</Link>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link to="/profile" className="hover:text-yellow-300 transition-colors">Profile</Link>
                <button 
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-yellow-300 transition-colors">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
