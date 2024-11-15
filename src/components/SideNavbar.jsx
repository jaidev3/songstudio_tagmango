import React from "react";
import { Search, Music2, BarChart3, Mic2, Star, ListMusic } from "lucide-react";
import "./SideNavbar.css";

const Sidebar = () => {
  return (
    <>
      <nav className="sidebar">
        {/* Logo and App Name Section */}
        <div className="logo-section">
          <h1 className="app-name">Song app</h1>
        </div>

        {/* Browse Section */}
        <div className="section">
          <h2 className="section-title">Browse</h2>
          <ul className="menu-list">
            <li className="menu-item">
              <Search size={20} />
              <span>Discover</span>
            </li>
            <li className="menu-item">
              <Music2 size={20} />
              <span>Genre</span>
            </li>
            <li className="menu-item">
              <BarChart3 size={20} />
              <span>Top Charts</span>
            </li>
            <li className="menu-item">
              <Mic2 size={20} />
              <span>Podcast</span>
            </li>
          </ul>
        </div>

        {/* Library Section */}
        <div className="section">
          <h2 className="section-title">Library</h2>
          <ul className="menu-list">
            <li className="menu-item">
              <Star size={20} />
              <span>Favourites</span>
            </li>
            <li className="menu-item">
              <ListMusic size={20} />
              <span>Playlist</span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
