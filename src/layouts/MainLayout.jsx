// MainLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideNavbar";
import MusicPlayer from "../components/MusicPlayer";
import Navbar from "../components/Navbar";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <>
      <div className="main-layout">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="content-wrapper">
          <div className="navbar-sidebar">
            <Sidebar />
          </div>
          <div className="song-app-container">
            <Outlet />
          </div>
        </div>
        <div className="music-player-container">
          <MusicPlayer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
