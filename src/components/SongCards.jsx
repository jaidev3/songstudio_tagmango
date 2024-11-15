import React from "react";
import { useDispatch } from "react-redux";
import { playSong } from "../redux/action";
import "./SongCards.css";

function SongCards({ song }) {
  const handlePlay = (e) => {
    dispatch(playSong(e));
  };

  // id: 5,
  // song: "Heat Waves",
  // artist: "Glass Animals",
  // url: "https://www.youtube.com/watch?v=mRD0-GxqHVo",
  // coverImage: "https://i.scdn.co/image/ab67616d0000b273848f88ec6ec31d9f2d95d2f8",
  // duration: "3:59",
  // genre: "Indie Pop",
  // releaseYear: 2020,
  const dispatch = useDispatch();
  console.log(song);
  return (
    <div className="song-card">
      <img className="cover-image" src={song.coverImage} alt="cover_image" />
      <h3>{song.song}</h3>
      <h5>{song.artist}</h5>
      <button className="play-button" onClick={() => handlePlay(song.url)}>
        play
      </button>
    </div>
  );
}

export default SongCards;
