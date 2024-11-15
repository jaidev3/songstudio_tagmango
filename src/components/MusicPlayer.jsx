import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import "./MusicPlayer.css";

function MusicPlayer() {
  const urlData = useSelector((state) => state.song);

  return (
    <div className="music-player">
      {urlData ? (
        <ReactPlayer url={urlData} width="100%" height="100px" controls={true} playing={true} loop={true} />
      ) : (
        <div className="music-player-empty">
          <div className="dummy-player">
            <div className="dummy-controls">
              <div className="dummy-button small"></div>
              <div className="dummy-button"></div>
              <div className="dummy-button large"></div>
              <div className="dummy-button"></div>
              <div className="dummy-button small"></div>
            </div>
            <span className="dummy-time">0:00</span>
            <div className="dummy-progress"></div>
            <span className="dummy-time">0:00</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;
