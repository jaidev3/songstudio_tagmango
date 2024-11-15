import React from "react";
import { useDispatch } from "react-redux";
import { playSong } from "../redux/action";
import "./SongCards.css";

function SongCards({ song }) {
  const handlePlay = (e) => {
    dispatch(playSong(e));
  };

  const dispatch = useDispatch();
  console.log(song);
  return (
    <div className="song-card">
      <img className="cover-image-card" src={song.coverImage} alt="cover_image" />
      <h3>{song.song}</h3>
      <h5>{song.artist}</h5>
      <button className="play-button-card" onClick={() => handlePlay(song.url)}>
        <span className="play-icon"></span>
      </button>
    </div>
  );
}

export default SongCards;
