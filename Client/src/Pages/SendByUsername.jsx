import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, User, MessageSquare, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const SendByUsername = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setIsLoading(true);

    try {
      const response = await axios.post(`http://localhost:5000/api/messages/${username}`, { 
        content: message 
      });

      if (response.status === 201) {
        setStatus('Message sent successfully');
        setUsername('');
        setMessage('');
      } else {
        setStatus('Unable to send message. Please check the username and try again.');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setStatus('User not found. Please check the username and try again.');
      } else {
        setStatus('Unable to send message. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 text-sm font-medium mb-6">
            <MessageSquare className="h-4 w-4" />
            <span>Anonymous Message</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Send a Message
          </h1>
          <p className="text-gray-400">
            Send an anonymous message to someone special
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Recipient Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Your Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  rows="4"
                  placeholder="Type your anonymous message here..."
                  required
                  maxLength={500}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {message.length}/500
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your message will be sent anonymously. Be kind and respectful.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          {/* Status Message */}
          {status && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${
                status.includes('successfully')
                  ? 'bg-green-900/30 border border-green-800 text-green-400'
                  : 'bg-red-900/30 border border-red-800 text-red-400'
              }`}
            >
              {status.includes('successfully') ? (
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{status}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-6"
        >
          <button
            onClick={handleGoBack}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go back</span>
          </button>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 text-xs text-gray-500"
        >
          <p>Messages are completely anonymous and encrypted.</p>
          <p>Please use this platform responsibly and respectfully.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SendByUsername;