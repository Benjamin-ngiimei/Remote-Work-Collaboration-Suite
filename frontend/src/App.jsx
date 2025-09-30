import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // modern icons

import Home from './pages/Home';
import DocumentEditor from './pages/DocumentEditor';
import VideoConference from './pages/VideoConference';
import Whiteboard from './pages/Whiteboard';
import TaskBoard from './pages/TaskBoard';
import Chat from './pages/Chat';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import './App.css';
import Footer from './pages/Footer';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/docs', label: 'Document Editor' },
    { to: '/video', label: 'Video Conference' },
    { to: '/whiteboard', label: 'Whiteboard' },
    { to: '/tasks', label: 'Task Board' },
    { to: '/chat', label: 'Chat' },
    { to: '/profile', label: 'Profile' },
  ];

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Brand */}
          <Link to="/" className="brand">
            <span className="brand-logo">
              RW
            </span>
            <span className="brand-name">
              Remote Suite
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="desktop-nav">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/signup" className="login-button">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" className="login-button">
                Login
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {mobileOpen && (
          <div className="mobile-nav-menu">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<DocumentEditor />} />
          <Route path="/video" element={<VideoConference />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/tasks" element={<TaskBoard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;