import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [form, setForm] = useState("");

  const handleInput = (e) => {
    setForm(e.target.value);
  };

  return (
    <>
      <div className="navbar">
        <h1 className="navbar-title">Sound Studio</h1>
        <div>
          <input 
            className="search-input"
            onChange={handleInput} 
            name="song" 
            placeholder="search songs" 
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
