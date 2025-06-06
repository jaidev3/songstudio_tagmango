import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../redux/action";
import { 
  FaPlay, 
  FaPause, 
  FaStepBackward, 
  FaStepForward, 
  FaVolumeUp, 
  FaVolumeMute,
  FaRandom,
  FaRedo,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";
import "./MusicPlayer.css";

function MusicPlayer() {
  const urlData = useSelector((state) => state.song);
  const currentSongData = useSelector((state) => state.currentSongData);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  
  const playerRef = useRef(null);
  const progressRef = useRef(null);

  const isFavorite = currentSongData && favorites.includes(currentSongData.id);

  useEffect(() => {
    if (urlData) {
      setPlaying(true);
    }
  }, [urlData]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const handleToggleFavorite = () => {
    if (currentSongData) {
      dispatch(toggleFavorite(currentSongData.id));
    }
  };

  const handleProgressClick = (e) => {
    const bounds = progressRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    playerRef.current.seekTo(percentage);
  };

  if (!urlData) {
    return (
      <div className="music-player-container">
        <div className="music-player-empty">
          <div className="empty-player-content">
            <div className="empty-album-art">
              <FaPlay className="empty-play-icon" />
            </div>
            <div className="empty-info">
              <h3>No song playing</h3>
              <p>Select a song to start listening</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="music-player-container">
      <div className="music-player">
        <ReactPlayer
          ref={playerRef}
          url={urlData}
          playing={playing}
          loop={loop}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={handleDuration}
          width="0"
          height="0"
        />
        
        {/* Left Section - Song Info */}
        <div className="player-song-info">
          <div className="player-album-art">
            <img 
              src={currentSongData?.coverImage || "https://picsum.photos/200/200"} 
              alt="Album Art" 
            />
          </div>
          <div className="player-song-details">
            <h4 className="player-song-title">
              {currentSongData?.song || "Unknown Song"}
            </h4>
            <p className="player-song-artist">
              {currentSongData?.artist || "Unknown Artist"}
            </p>
          </div>
          {currentSongData && (
            <button 
              className={`player-favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleToggleFavorite}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          )}
        </div>

        {/* Center Section - Controls & Progress */}
        <div className="player-controls-section">
          <div className="player-controls">
            <button 
              className={`control-btn ${shuffle ? 'active' : ''}`}
              onClick={() => setShuffle(!shuffle)}
              title="Shuffle"
            >
              <FaRandom />
            </button>
            <button className="control-btn" title="Previous">
              <FaStepBackward />
            </button>
            <button 
              className="control-btn play-pause-btn" 
              onClick={handlePlayPause}
              title={playing ? "Pause" : "Play"}
            >
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <button className="control-btn" title="Next">
              <FaStepForward />
            </button>
            <button 
              className={`control-btn ${loop ? 'active' : ''}`}
              onClick={() => setLoop(!loop)}
              title="Loop"
            >
              <FaRedo />
            </button>
          </div>
          
          <div className="player-progress-section">
            <span className="time-label">{formatTime(played * duration)}</span>
            <div 
              className="progress-bar-container" 
              ref={progressRef}
              onClick={handleProgressClick}
            >
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${played * 100}%` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                className="progress-slider"
              />
            </div>
            <span className="time-label">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Section - Volume */}
        <div className="player-volume-section">
          <button 
            className="volume-btn" 
            onClick={handleToggleMute}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <div className="volume-slider-container">
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
