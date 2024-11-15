import React, { useState } from "react";
import "./Navbar.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
function Navbar() {
  const [form, setForm] = useState("");
  const [theme, setTheme] = useState(true);
  const handleInput = (e) => {
    setForm(e.target.value);
  };

  const handleTheme = () => {
    setTheme(!theme);
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <h1 className="navbar-title">Sound Studio</h1>
        </div>

        <div className="navbar-center">
          <button className="home-button">
            <MdHomeFilled size={20} />
          </button>
          <input className="search-input" onChange={handleInput} name="song" placeholder="What do you want to play?" />
        </div>

        <div className="navbar-right" onClick={handleTheme}>
          {theme ? <FaMoon className="theme-icon" /> : <FaSun className="theme-icon" />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
