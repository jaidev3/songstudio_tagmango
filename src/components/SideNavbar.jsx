import React from "react";
import { Star, ListMusic, Home, Plus, Download, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./SideNavbar.css";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth <= 768 && closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <>
      <nav className="sidebar">
        <button 
          className="sidebar-close-btn"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
        {/* Browse Section */}
        <div className="section">
          <h2 className="section-title">Browse</h2>
          <ul className="menu-list">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }} onClick={handleNavClick}>
              <li className={`menu-item ${isActive('/') ? 'active' : ''}`}>
                <Home size={20} />
                <span>Home</span>
              </li>
            </Link>
            <Link to="/add-song" style={{ color: "inherit", textDecoration: "none" }} onClick={handleNavClick}>
              <li className={`menu-item ${isActive('/add-song') ? 'active' : ''}`}>
                <Plus size={20} />
                <span>Add Song</span>
              </li>
            </Link>
          </ul>
        </div>

        {/* Library Section */}
        <div className="section">
          <h2 className="section-title">Library</h2>
          <ul className="menu-list">
            <Link to="/favourites" style={{ color: "inherit", textDecoration: "none" }} onClick={handleNavClick}>
              <li className={`menu-item ${isActive('/favourites') ? 'active' : ''}`}>
                <Star size={20} />
                <span>Favourites</span>
              </li>
            </Link>
            <Link to="/playlists" style={{ color: "inherit", textDecoration: "none" }} onClick={handleNavClick}>
              <li className={`menu-item ${isActive('/playlists') ? 'active' : ''}`}>
                <ListMusic size={20} />
                <span>My Playlists</span>
              </li>
            </Link>
          </ul>
        </div>

        {/* Data Management Section */}
        <div className="section">
          <h2 className="section-title">Data Management</h2>
          <ul className="menu-list">
            <Link to="/export-import" style={{ color: "inherit", textDecoration: "none" }} onClick={handleNavClick}>
              <li className={`menu-item ${isActive('/export-import') ? 'active' : ''}`}>
                <Download size={20} />
                <span>Export/Import Data</span>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
