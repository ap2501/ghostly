import { motion } from "framer-motion";
import Navbar from "../Components/Navbar.jsx";
import { Link } from "react-router-dom";


const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white">
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-12 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to <span className="text-yellow-400">Anonymous Messaging</span>! Our platform is dedicated to providing a seamless and engaging way for users to receive and send anonymous messages. We believe in maintaining privacy while fostering open and honest communication. Whether you're looking to get feedback, share a compliment, or just have some fun, our app is designed to make your experience as smooth and enjoyable as possible.
          </motion.p>
          <motion.div
            className="bg-white text-gray-800 p-8 rounded-lg shadow-xl max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-indigo-600">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6">
              Our mission is to create a platform where users can interact anonymously with their friends, receive genuine feedback, and enjoy a safe and respectful environment. We prioritize your privacy and strive to offer a user-friendly experience that encourages open and meaningful communication.
            </p>
            <h2 className="text-3xl font-semibold mb-6 text-green-600">
              What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li className="mb-4">
                <span className="font-semibold">Easy Setup:</span> Create your profile and start sharing your unique link in minutes.
              </li>
              <li className="mb-4">
                <span className="font-semibold">Anonymous Interaction:</span> Enjoy conversations without revealing your identity.
              </li>
              <li className="mb-4">
                <span className="font-semibold">User-Friendly Design:</span> A clean and intuitive interface designed for an engaging experience.
              </li>
            </ul>
          </motion.div>
          <Link
            to="/contact"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold mt-12 hover:bg-yellow-300 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

export default About;
