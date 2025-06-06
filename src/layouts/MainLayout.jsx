// MainLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideNavbar";
import MusicPlayer from "../components/MusicPlayer";
import Navbar from "../components/Navbar";
import "./MainLayout.css";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  };
  return (
    <>
      <div className="main-layout">
        <div className="navbar-container">
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="content-wrapper">
          <div className={`navbar-sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
          </div>
          {isSidebarOpen && (
            <div 
              className="sidebar-backdrop" 
              onClick={toggleSidebar}
              aria-hidden="true"
            />
          )}
          <div className="song-app-container">
            <Outlet />
          </div>
        </div>
        <div className="music-player-wrapper">
          <MusicPlayer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
