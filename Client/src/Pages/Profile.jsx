import { useState, useEffect, useContext } from "react";
import { Copy, MessageSquare, RefreshCw, Link2, Calendar, Clock } from "lucide-react";
import AuthContext from "../Context/AuthContext";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const { token, username } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMessages = async () => {
    setIsRefreshing(true);
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
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, [token]);

  const baseUrl = window.location.origin;

  const handleCopy = async () => {
    const uniqueLink = `${baseUrl}/sendmessages/${username}`;
    try {
      await navigator.clipboard.writeText(uniqueLink);
      setCopySuccess('Link copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (err) {
      setCopySuccess('Failed to copy link');
      setTimeout(() => setCopySuccess(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Dashboard</h1>
          <p className="text-gray-400">Manage your anonymous message link and view received messages.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Link Management */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">
                    {username ? username.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">@{username}</h2>
                  <p className="text-gray-400">Your Profile</p>
                </div>
              </div>
              
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">{messages.length}</div>
                <div className="text-sm text-gray-400">Total Messages</div>
              </div>
            </div>

            {/* Link Sharing Card */}
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Link2 className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Your Unique Link</h3>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">
                Share this link with friends to start receiving anonymous messages.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={`${baseUrl}/sendmessages/${username}`}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center space-x-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </button>
                </div>
                
                {copySuccess && (
                  <div className={`text-sm px-3 py-2 rounded-lg ${
                    copySuccess.includes('Failed') 
                      ? 'text-red-400 bg-red-900/30 border border-red-800' 
                      : 'text-green-400 bg-green-900/30 border border-green-800'
                  }`}>
                    {copySuccess}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Messages */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
              {/* Messages Header */}
              <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Anonymous Messages</h2>
                  <p className="text-gray-400 text-sm">Messages from your network</p>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Messages Content */}
              <div className="p-6">
                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={message.id || index}
                        className="p-5 bg-gray-700 rounded-xl border border-gray-600 hover:bg-gray-650 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-100 text-base leading-relaxed mb-3">
                              {message.content}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(message.createdAt).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {new Date(message.createdAt).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No messages yet</h3>
                    <p className="text-gray-400 mb-6">
                      Share your link to start receiving anonymous messages.
                    </p>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy Your Link</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;