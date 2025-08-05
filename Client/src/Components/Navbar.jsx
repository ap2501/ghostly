import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Menu, X, LogOut, User, Send, Home, Info } from "lucide-react";
import AuthContext from "../Context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo/Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">
                <span className="text-white">Ghost</span>
                <span className="text-blue-400">Ly</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            {token && (
              <Link 
                to="/profile" 
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            )}
            <Link 
              to="/send" 
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
          </div>
          
          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <button 
                onClick={logout}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              {token && (
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              )}
              <Link 
                to="/send" 
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </Link>
              <Link 
                to="/about" 
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Info className="h-4 w-4" />
                <span>About</span>
              </Link>
              
              {/* Mobile User Actions */}
              <div className="border-t border-gray-700 pt-4 mt-4">
                {token ? (
                  <button 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      to="/login" 
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;