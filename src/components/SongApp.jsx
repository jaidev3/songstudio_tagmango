import React from "react";
import { useState } from "react";
import SongCards from "./SongCards";
import "./SongApp.css";
import { songsData } from "../data";
import MusicPlayer from "./MusicPlayer";

function SongApp() {
  const [songdata, setSongdata] = useState(songsData);
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 8;

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songdata.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songdata.length / songsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="song-app">
        <div className="songlist">
          {currentSongs.map((song, index) => (
            <SongCards key={index} song={song} />
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <MusicPlayer />
      </div>
    </>
  );
}

export default SongApp;
