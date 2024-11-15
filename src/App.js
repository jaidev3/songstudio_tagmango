import "./App.css";
import SongApp from "./components/SongApp";
import Sidebar from "./components/SideNavbar";

function App() {
  return (
    <div className="app">
      <div className="navbar-sidebar">
        <Sidebar />
      </div>
      <div className="song-app-container">
        <SongApp />
      </div>
    </div>
  );
}

export default App;


