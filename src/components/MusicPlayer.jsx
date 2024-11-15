import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import "./MusicPlayer.css";

function MusicPlayer() {
  const urlData = useSelector((state) => state.song);

  return (
    <div className="music-player">
      <ReactPlayer 
        url={urlData} 
        width="100%" 
        height="100px" 
        controls={true} 
        playing={true}
      />
    </div>
  );
}

export default MusicPlayer; 