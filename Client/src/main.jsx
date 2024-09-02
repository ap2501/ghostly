import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';
import Profile from './Pages/Profile.jsx';
import SendMessage from './Pages/SendMessage.jsx'; // Import the new component

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import About from './Pages/About.jsx';
import SendByUsername from './Pages/SendByUsername.jsx';
import Navbar from './Components/Navbar.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <PrivateRoute element={<Profile />} />, // Protect this route
  },
  {
    path: '/sendmessages/:username',
    element: <SendMessage />, 
  },
  {
    path: '/about',
    element: <About />, 
  },
  {
    path: '/send',
    element: [<Navbar/>, <SendByUsername />], 
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
