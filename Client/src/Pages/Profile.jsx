import { useState, useEffect, useContext } from "react";
import { ClipboardCopyIcon, ShareIcon, ChatIcon, MailIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const { token, username } = useContext(AuthContext); // Access username
  const [messages, setMessages] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/messages", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          throw new Error("Failed to fetch messages");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchMessages();
  }, [token]);

  // Get base URL from window location
  const baseUrl = window.location.origin;

  const handleCopy = () => {
    const uniqueLink = `${baseUrl}/sendmessages/${username}`; // Create the unique link
    navigator.clipboard.writeText(uniqueLink);
    setCopySuccess('Link copied to clipboard!');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
        {/* Left Segment - Profile */}
        <div className="flex-1 flex flex-col justify-center p-8 bg-gray-900 shadow-lg rounded-lg max-w-sm mx-auto lg:mx-0 lg:max-w-md">
          <motion.h1
            className="text-4xl font-extrabold text-white mb-6 text-center flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ChatIcon className="h-8 w-8 text-yellow-400 mr-2" />
            Welcome, Superstar! 🌟
          </motion.h1>

          <motion.div
            className="p-6 bg-gray-800 rounded-lg mb-6 shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <ShareIcon className="h-6 w-6 mr-2 text-indigo-400" />
              Your Unique Link
            </h2>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={`${baseUrl}/sendmessages/${username}`} // Use the base URL and username to create the link
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-700 text-white font-medium"
              />
              <button
                onClick={handleCopy}
                className="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <ClipboardCopyIcon className="h-5 w-5" />
              </button>
            </div>
            {copySuccess && <p className="text-green-400 mt-4 text-center">{copySuccess}</p>}
          </motion.div>

          <p className="text-center text-lg text-gray-400">
            Share your link with friends to start receiving anonymous messages!
          </p>
        </div>

        {/* Right Segment - Messages */}
        <div className="flex-1 p-8 overflow-y-auto max-h-screen">
          <motion.h2
            className="text-3xl font-bold text-white mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Here's What People Are Saying About You
          </motion.h2>

          {messages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-yellow-400 via-red-400 to-pink-500 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start mb-4">
                    <MailIcon className="h-8 w-8 text-white mr-3 flex-shrink-0" />
                    <p className="text-lg font-semibold text-white flex-1">
                      {message.content}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-white">
                      {new Date(message.createdAt).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-sm text-white">
                      {new Date(message.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-white mt-6">
              No messages yet! Share your link to start receiving anonymous feedback.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
