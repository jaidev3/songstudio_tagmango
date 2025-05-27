import React, { useState } from "react";
import "./Navbar.css";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../providers/ThemeProvider";

function Navbar() {
  const { themeName, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <FaBars size={22} />
        </button>
      </div>
      <div className="navbar-center">
        <Link to="/" className="navbar-logo">
          {/* Replace with logo image if available */}
          <span>Sound Studio</span>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="navbar-auth-btn">
          Login
        </Link>
        <Link to="/signup" className="navbar-auth-btn navbar-signup">
          Sign Up
        </Link>
        <button
          className="navbar-theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {themeName === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      {/* Mobile menu overlay (optional, can be expanded later) */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          <button
            className="navbar-mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          {/* Add mobile menu items here if needed */}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
