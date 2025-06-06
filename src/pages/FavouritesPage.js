import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadFavorites } from "../redux/action";
import SongList from "../components/SongList";
import { songsData } from "../data";
import { FaHeart } from "react-icons/fa";
import "./FavouritesPage.css";

function FavouritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const customSongs = useSelector((state) => state.songs);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage on mount
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      dispatch(loadFavorites(JSON.parse(storedFavorites)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Get all songs (default + custom)
    const allSongs = [...songsData, ...customSongs];
    // Filter only favorite songs
    const filtered = allSongs.filter(song => favorites.includes(song.id));
    setFavoriteSongs(filtered);
  }, [favorites, customSongs]);

  return (
    <div className="favorites-page">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">
              <FaHeart className="heart-icon" /> My Favorites
            </h1>
            <p className="page-subtitle">
              {favoriteSongs.length} song{favoriteSongs.length !== 1 ? 's' : ''} in your collection
            </p>
          </div>
        </div>
      </div>

      {favoriteSongs.length > 0 ? (
        <div className="songs-grid">
          {favoriteSongs.map((song) => (
            <SongList key={song.id} song={song} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FaHeart className="empty-icon" />
          <h3>No favorites yet</h3>
          <p>Start adding songs to your favorites to see them here</p>
        </div>
      )}
    </div>
  );
}

export default FavouritesPage;
