import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, User, MessageSquare, CheckCircle, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import Navbar from '../Components/Navbar';

const SendMessage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/messages/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setMessage('');
      } else if (response.status === 404) {
        setStatus('User not found. Please check the username.');
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('Network error occurred. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
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
            <h1 className="text-4xl font-bold text-white mb-2">
              Send Message to <span className="text-blue-400">@{username}</span>
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto">
              Your message will be delivered anonymously. The recipient won't know who sent it.
            </p>
          </motion.div>

          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-semibold">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">@{username}</h2>
                <p className="text-gray-400">Ready to receive your anonymous message</p>
              </div>
            </div>
          </motion.div>

          {/* Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3">
                  Your Anonymous Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    rows="6"
                    placeholder="Type your anonymous message here... Be kind and respectful."
                    required
                    maxLength={500}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {message.length}/500
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-300 font-medium mb-1">Privacy Protected</p>
                    <p className="text-blue-200/80">
                      Your identity is completely anonymous. The recipient will only see your message, not who sent it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Anonymous Message</span>
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
                  status.includes('success')
                    ? 'bg-green-900/30 border border-green-800 text-green-400'
                    : 'bg-red-900/30 border border-red-800 text-red-400'
                }`}
              >
                {status.includes('success') ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{status}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <button
              onClick={handleGoBack}
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </button>
          </motion.div>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mt-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Message Guidelines</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>• Be respectful and constructive in your feedback</p>
              <p>• Avoid sharing personal information or inappropriate content</p>
              <p>• Remember that your message should be helpful or positive</p>
              <p>• Messages are anonymous but should still be professional</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SendMessage;