import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import { motion } from "framer-motion";
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white">
        {isAuthenticated ? (
          <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Welcome Back, <span className="text-yellow-400">{username}</span>!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8">
              Here are a few messages you have received:
            </p>
            <div className="relative w-full max-w-xl overflow-hidden">
              <motion.div
                className="flex space-x-4"
                animate={{ x: [0, -110, -220, -330, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear",
                }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="flex-none w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
                  >
                    <p className="text-lg font-semibold">
                      {msg}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
            <Link
              to="/profile"
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold mt-8 hover:bg-yellow-300 transition duration-300"
            >
              Check All Messages
            </Link>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <header className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative bg-[url('/path-to-your-hero-image.jpg')]">
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                  Welcome to{" "}
                  <span className="text-yellow-400">Anonymous Messaging</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-8">
                  Share your unique link and receive anonymous messages from
                  your friends.
                </p>
                <Link
                  to="/signup"
                  className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-yellow-300 transition duration-300"
                >
                  Get Started
                </Link>
              </div>
            </header>

            {/* Features Section */}
            <section className="py-12 px-6 sm:px-12 bg-gradient-to-br from-blue-100 to-purple-100">
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Why Choose Us?
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
                      Easy to Use
                    </h3>
                    <p className="text-gray-700">
                      Quickly set up your profile and share your unique link to
                      start receiving anonymous messages in minutes.
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-green-600">
                      Anonymous & Secure
                    </h3>
                    <p className="text-gray-700">
                      Your privacy is our top priority. Enjoy anonymous
                      interactions without revealing your personal information.
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-pink-600">
                      Engaging Experience
                    </h3>
                    <p className="text-gray-700">
                      Our platform offers an engaging and user-friendly
                      experience, making it easy to interact and respond.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-8 text-center">
              <motion.p
                className="text-gray-300 text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                &copy; {new Date().getFullYear()} Anonymous Messaging. All
                rights reserved.
              </motion.p>
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-gray-300 mx-2 transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  to="/terms-of-service"
                  className="text-gray-400 hover:text-gray-300 mx-2 transition-colors"
                >
                  Terms of Service
                </Link>
              </motion.div>
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
