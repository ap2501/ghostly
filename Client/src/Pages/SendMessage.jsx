import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';

const SendMessage = () => {
  const { username } = useParams();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 p-8">
      <motion.div
        className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          Send a Message to {username}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full p-4 border border-gray-700 rounded-md bg-gray-800 text-white"
            placeholder="Type your message here..."
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
        {status && (
          <p className={`mt-4 text-center ${status.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
            {status}
          </p>
        )}
      </motion.div>
    </div>
    </>
  );
};

export default SendMessage;
