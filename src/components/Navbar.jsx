import React, { useState } from "react";
import "./Navbar.css";
import { FaMoon, FaSun, FaMusic, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../providers/ThemeProvider";

function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { themeName, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button 
          className="hamburger-menu"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <Link to="/" className="navbar-logo">
          <FaMusic className="logo-icon" />
          <span>Song Studio</span>
        </Link>
      </div>
      <div className="navbar-center">
        {/* Can add search bar or other elements here */}
      </div>
      <div className="navbar-right">
        <button
          className="navbar-theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {themeName === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
