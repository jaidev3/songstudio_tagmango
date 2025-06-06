import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SongList from "../components/SongList";
import "./HomePage.css";
import { songsData } from "../data";
import { FaSearch, FaTimes, FaPlus } from "react-icons/fa";
import { loadSongs, loadFavorites, loadPlaylists } from "../redux/action";
import { FaFilter } from "react-icons/fa";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customSongs = useSelector((state) => state.songs);
  const [allSongs, setAllSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchType, setSearchType] = useState("all"); // all, song, artist
  const songsPerPage = 8;

  useEffect(() => {
    // Load songs from localStorage on mount
    const storedSongs = localStorage.getItem('customSongs');
    if (storedSongs) {
      dispatch(loadSongs(JSON.parse(storedSongs)));
    }
    
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      dispatch(loadFavorites(JSON.parse(storedFavorites)));
    }
    
    // Load playlists from localStorage
    const storedPlaylists = localStorage.getItem('playlists');
    if (storedPlaylists) {
      dispatch(loadPlaylists(JSON.parse(storedPlaylists)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Combine default songs with custom songs
    const combinedSongs = [...songsData, ...customSongs];
    setAllSongs(combinedSongs);
    applyFilters(combinedSongs, searchTerm, selectedGenre, searchType);
  }, [customSongs]);

  // Get unique genres from all songs
  const genres = ["All", ...new Set(allSongs.map(song => song.genre).filter(Boolean))];

  // Apply all filters
  const applyFilters = (songs, search, genre, type) => {
    let filtered = songs;

    // Genre filter
    if (genre !== "All") {
      filtered = filtered.filter(song => song.genre === genre);
    }

    // Search filter
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((song) => {
        switch (type) {
          case "song":
            return song.song.toLowerCase().includes(searchLower);
          case "artist":
            return song.artist.toLowerCase().includes(searchLower);
          case "all":
          default:
            return (
              song.song.toLowerCase().includes(searchLower) ||
              song.artist.toLowerCase().includes(searchLower) ||
              (song.genre && song.genre.toLowerCase().includes(searchLower)) ||
              (song.releaseYear && song.releaseYear.toString().includes(search))
            );
        }
      });
    }

    setFilteredSongs(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(allSongs, value, selectedGenre, searchType);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    applyFilters(allSongs, searchTerm, genre, searchType);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    applyFilters(allSongs, searchTerm, selectedGenre, type);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedGenre("All");
    setSearchType("all");
    setFilteredSongs(allSongs);
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
        <div className="header-content">
          <div>
            <h1 className="page-title">Discover Music</h1>
            <p className="page-subtitle">
              Explore your favorite tracks and discover new sounds
            </p>
          </div>
          <button
            className="add-song-btn"
            onClick={() => navigate('/add-song')}
          >
            <FaPlus /> Add Song
          </button>
        </div>
      </div>

      <div className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder={`Search ${searchType === 'all' ? 'songs, artists, genres, years' : searchType}...`}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            {(searchTerm || selectedGenre !== "All") && (
              <button onClick={clearSearch} className="clear-search-btn">
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className="filter-section">
            <div className="filter-header">
              <FaFilter className="filter-icon" />
              <span>Filters</span>
            </div>
            <div className="filter-controls">
              <div className="filter-group">
                <label htmlFor="search-type" className="filter-label">Search in</label>
                <select
                  id="search-type"
                  value={searchType}
                  onChange={(e) => handleSearchTypeChange(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Fields</option>
                  <option value="song">Song Title</option>
                  <option value="artist">Artist Name</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="genre-filter" className="filter-label">Genre</label>
                <select
                  id="genre-filter"
                  value={selectedGenre}
                  onChange={(e) => handleGenreChange(e.target.value)}
                  className="filter-select"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {(searchTerm || selectedGenre !== "All") && (
            <div className="search-results-info">
              <div className="results-count">
                Found <strong>{filteredSongs.length}</strong> result{filteredSongs.length !== 1 ? "s" : ""}
              </div>
              <div className="active-filters">
                {searchTerm && (
                  <span className="filter-tag">
                    Search: "{searchTerm}"
                    <button onClick={() => handleSearch("")} className="remove-filter">
                      <FaTimes />
                    </button>
                  </span>
                )}
                {selectedGenre !== "All" && (
                  <span className="filter-tag">
                    Genre: {selectedGenre}
                    <button onClick={() => handleGenreChange("All")} className="remove-filter">
                      <FaTimes />
                    </button>
                  </span>
                )}
              </div>
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
