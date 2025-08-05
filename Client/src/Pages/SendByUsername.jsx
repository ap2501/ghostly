import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SendByUsername = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(''); // Reset status

    try {
      const response = await axios.post(`http://localhost:5000/api/messages/${username}`, { content: message });

      if (response.status===201) {
        setStatus('Message Sent Successfully');
        setUsername(''); // Clear inputs
        setMessage('');
      } else {
        setStatus('Unable To Send Message, Check credentials Or Try Again Later...');
      }
    } catch (error) {
      setStatus('Unable To Send Message, Check credentials Or Try Again Later...');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white flex items-center justify-center">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <motion.h1
          className="text-3xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Send a Message
        </motion.h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-yellow-300 transition duration-300 w-full"
          >
            Send
          </button>
        </form>
        {status && (
          <motion.p
            className={`mt-4 text-center font-semibold ${status.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {status}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default SendByUsername;
