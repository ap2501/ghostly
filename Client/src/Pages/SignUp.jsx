import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Shield, Eye, EyeOff, Zap, Users } from "lucide-react";
import Navbar from "../Components/Navbar";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://ghostly-backend-cyan.vercel.app/api/users/register', 
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password: pass }),
        } 
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Please log in.');
        setError('');
        setUsername('');
        setEmail('');
        setPass('');
      } else if (response.status === 409) {
        setError('Username already in use. Please try a different username.');
        setSuccess('');
      } else if (response.status === 401) {
        setError('You are already registered. Please log in.');
        setSuccess('');
      } else {
        setError(data.error || 'Registration failed. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('Failed to connect to the server. Please try again later.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900/40"></div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Sign Up Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <MessageSquare className="h-8 w-8 text-blue-400" />
                  <span className="text-2xl font-bold text-white">Create Account</span>
                </div>
                <p className="text-gray-400">Join our anonymous messaging platform</p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm text-center">{success}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Sign Up Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Choose a unique username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Create a secure password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Highlights */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-green-600/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400 text-sm font-medium mb-6">
                <Users className="h-4 w-4" />
                <span>Join the Community</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                Start Your Journey
                <span className="block text-blue-400">With Anonymous Messaging</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Create your account and get your unique link to start receiving anonymous messages from your network.
              </p>
            </div>

            {/* Feature Points */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Quick Setup</h3>
                  <p className="text-gray-400 text-sm">Get your unique link in under a minute</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Complete Privacy</h3>
                  <p className="text-gray-400 text-sm">Senders remain completely anonymous</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Build Connections</h3>
                  <p className="text-gray-400 text-sm">Foster honest communication</p>
                </div>
              </div>
            </div>

            {/* Additional CTA */}
            <div className="mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Ready to get started?</h3>
              <p className="text-gray-400 text-sm">
                Join thousands of users who are already connecting through anonymous messages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;