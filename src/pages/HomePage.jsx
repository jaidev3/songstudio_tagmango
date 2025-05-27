import React from "react";
import { useState } from "react";
import SongList from "../components/SongList";
import "./HomePage.css";
import { songsData } from "../data";
import { FaSearch, FaTimes } from "react-icons/fa";

function HomePage() {
  const [songdata, setSongdata] = useState(songsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songsData);
  const songsPerPage = 8;

  // Filter songs based on search term
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching

    if (value.trim() === "") {
      setFilteredSongs(songsData);
    } else {
      const filtered = songsData.filter(
        (song) =>
          song.title.toLowerCase().includes(value.toLowerCase()) ||
          song.artist.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredSongs(songsData);
    setCurrentPage(1);
  };

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="song-app">
      <div className="page-header">
        <h1 className="page-title">Discover Music</h1>
        <p className="page-subtitle">
          Explore your favorite tracks and discover new sounds
        </p>
      </div>

      <div className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for songs, artists..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="clear-search-btn">
                <FaTimes />
              </button>
            )}
          </div>
          {searchTerm && (
            <div className="search-results-info">
              Found {filteredSongs.length} result
              {filteredSongs.length !== 1 ? "s" : ""} for "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      <div className="song-app-content-pagination">
        <div className="songs-grid">
          {currentSongs.length > 0 ? (
            currentSongs.map((song, index) => (
              <SongList key={index} song={song} />
            ))
          ) : (
            <div className="no-results">
              <h3>No songs found</h3>
              <p>Try searching with different keywords</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={currentPage === pageNumber ? "active" : ""}
                >
                  <span>{pageNumber}</span>
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
