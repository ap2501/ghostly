import { useState } from "react";
import Navbar from "../Components/Navbar";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:5000/api/users/register', 
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
      } else if (response.status === 409) { // Conflict: Username already in use
        setError('Username already in use. Please try a different username.');
        setSuccess('');
      } else if (response.status === 401) { // Unauthorized: User already exists (if applicable)
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
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
      {/* Left Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold text-center mb-6">
            <span className="text-yellow-300">Join</span> <span className="text-purple-500">the</span> <span className="text-pink-400">Community!</span>
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-lg font-semibold text-gray-300">Username</label>
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 sm:text-base" 
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-300">Email</label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 sm:text-base" 
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-semibold text-gray-300">Password</label>
              <input 
                type="password" 
                id="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 sm:text-base" 
                placeholder="Create a password"
              />
            </div>
            <button 
              type="submit"
              disabled={loading} // Disable button when loading
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-transform duration-300 ease-in-out transform ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {success && <p className="mt-4 text-center text-sm text-green-300 animate-pulse">{success}</p>}
          {error && <p className="mt-4 text-center text-sm text-red-300 animate-pulse">{error}</p>}

          <p className="mt-2 text-center text-sm text-gray-300">
            Already have an account? <a href="/login" className="font-semibold text-yellow-400 hover:text-yellow-300">Log in</a>
          </p>
        </div>
      </div>
      
      {/* Right Side - About the App */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-300 via-purple-400 to-pink-300">
        <div className="text-center text-white space-y-4">
          <h2 className="text-5xl font-extrabold mb-4">
            <span className="text-yellow-400">Discover</span> &nbsp;
            <span className="text-purple-500">Connect</span>
          </h2>
          <p className="text-lg mb-4">
            <span className="text-yellow-300">Experience a new way</span> to connect with friends and share your thoughts anonymously. Our platform provides a <span className="text-green-300">fun and secure</span> space for creative expression and meaningful interactions.
          </p>
          <p className="text-lg mb-4">
            <span className="text-red-300">Join us now</span> and be part of a vibrant community that values your <span className="text-teal-300">privacy</span> and <span className="text-pink-200">creativity</span>.
          </p>
          <a href="/signup" className="inline-block py-3 px-6 text-lg font-semibold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

export default SignUp;
