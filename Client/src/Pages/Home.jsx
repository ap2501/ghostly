import { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Shield, Zap, Users, ChevronRight, Star } from "lucide-react";
import Navbar from "../Components/Navbar.jsx";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated, username } = useContext(AuthContext);

  const messages = [
    "Just wanted to say you're awesome!",
    "Had a great time hanging out last weekend!",
    "Your advice really helped me, thank you!",
    "I admire your work ethic, keep it up!",
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {isAuthenticated ? (
        // Authenticated Dashboard View
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Welcome Header */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                Welcome back, <span className="text-blue-400">{username}</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Here are some recent messages from your network
              </p>
            </div>

            {/* Message Carousel */}
            <div className="mb-12 overflow-hidden relative">
              <div className="flex space-x-6 animate-scroll">
                {[...messages, ...messages].map((msg, index) => (
                  <div
                    key={index}
                    className="flex-none w-80 bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-blue-400" />
                      </div>
                      <p className="text-gray-200 text-base leading-relaxed">
                        "{msg}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/profile"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
            >
              <span>View All Messages</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      ) : (
        // Non-authenticated Landing Page
        <>
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900/40"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 text-sm font-medium mb-6">
                  <Star className="h-4 w-4" />
                  <span>Anonymous Messaging Platform</span>
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
                  Connect Through
                  <span className="block text-blue-400">Anonymous Messages</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Create your unique link and receive honest, anonymous feedback from friends, colleagues, and your network.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
                >
                  <span>Get Started</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 border border-gray-600"
                >
                  <span>Sign In</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 bg-gray-800/50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  Why Choose Our Platform?
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Built for privacy, designed for connection, and optimized for honest communication.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl hover:bg-gray-750 transition-colors">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6">
                    <Zap className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Quick Setup
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Create your profile and get your unique link in under a minute. Start receiving messages immediately.
                  </p>
                </div>

                <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl hover:bg-gray-750 transition-colors">
                  <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-6">
                    <Shield className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Private & Secure
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Complete anonymity for senders. Your data is encrypted and protected with industry-standard security.
                  </p>
                </div>

                <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl hover:bg-gray-750 transition-colors">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Build Connections
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Foster honest communication and build stronger relationships through anonymous feedback and messages.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gray-900">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already connecting through anonymous messages.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
              >
                <span>Create Your Account</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 border-t border-gray-700 py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-400" />
                  <span className="text-xl font-semibold text-white">Anonymous Messaging</span>
                </div>
                <p className="text-gray-400 mb-6">
                  &copy; {new Date().getFullYear()} Anonymous Messaging Platform. All rights reserved.
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <Link
                    to="/privacy-policy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link
                    to="/terms-of-service"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Home;