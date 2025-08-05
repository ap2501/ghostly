import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Navbar from "../Components/Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password: pass }),
      });

      const data = await response.json();

      if (response.ok) {
        // Pass both the token and the username to the login function
        login(data.token, username);
        setError('');
        setUsername('');
        setPass('');
        navigate('/profile');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }

    } catch (error) {
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
          <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-xl">
            <h2 className="text-4xl font-extrabold text-center mb-6">
              <span className="text-yellow-300">Login</span> <span className="text-purple-500">to</span> <span className="text-pink-400">Your Account</span>
            </h2>
            {error && <p className="text-red-400 text-center mb-4 animate-pulse">{error}</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-lg font-semibold text-gray-300">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 sm:text-base"
                  placeholder="Enter your username"
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
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                disabled={loading} // Disable button when loading
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-transform duration-300 ease-in-out transform ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                }`}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Right Side - About the App */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-300 via-purple-400 to-pink-300">
          <div className="text-center text-white space-y-4">
            <h2 className="text-5xl font-extrabold mb-4">
              <span className="text-yellow-400">Explore</span> &nbsp;
              <span className="text-purple-500">Our</span> <span className="text-pink-200">Features</span>
            </h2>
            <p className="text-lg mb-4">
              <span className="text-yellow-300">Unlock new experiences</span> with our app. Enjoy seamless connections and manage your account with ease. Our platform offers a <span className="text-green-300">secure</span> and <span className="text-teal-300">intuitive</span> interface.
            </p>
            <p className="text-lg mb-4">
              <span className="text-red-300">Join us today</span> and be part of a vibrant community. <span className="text-teal-400">Your journey</span> starts here!
            </p>
            <a href="/signup" className="inline-block py-3 px-6 text-lg font-semibold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
              Sign Up Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
