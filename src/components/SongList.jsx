import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playSong, setCurrentSongData, deleteSong, toggleFavorite, addToPlaylist } from "../redux/action";
import { FaTrash, FaHeart, FaRegHeart, FaPlus } from "react-icons/fa";
import "./SongList.css";

function SongList({ song }) {
  const dispatch = useDispatch();
  const customSongs = useSelector((state) => state.songs);
  const favorites = useSelector((state) => state.favorites);
  const playlists = useSelector((state) => state.playlists);
  const isCustomSong = customSongs.some(s => s.id === song.id);
  const isFavorite = favorites.includes(song.id);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const playlistMenuRef = useRef(null);

  const handlePlay = () => {
    dispatch(playSong(song.url));
    dispatch(setCurrentSongData(song));
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${song.song}"?`)) {
      dispatch(deleteSong(song.id));
    }
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(song.id));
  };

  const handleAddToPlaylist = (playlistId) => {
    dispatch(addToPlaylist(playlistId, song.id));
    setShowPlaylistMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (playlistMenuRef.current && !playlistMenuRef.current.contains(event.target)) {
        setShowPlaylistMenu(false);
      }
    };

    if (showPlaylistMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPlaylistMenu]);
  return (
    <div className="song-list">
      <img className="cover-image" src={song.coverImage} alt="cover_image" />
      <div className="song-info">
        <h3>{song.song}</h3>
        <h5>{song.artist}</h5>
        <span className="song-meta">{song.genre} • {song.releaseYear}</span>
      </div>
      <div className="song-actions">
        <button 
          className={`favorite-button ${isFavorite ? 'active' : ''}`} 
          onClick={handleToggleFavorite}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        
        <div className="playlist-button-wrapper" ref={playlistMenuRef}>
          <button 
            className="playlist-button" 
            onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
            title="Add to playlist"
          >
            <FaPlus />
          </button>
          
          {showPlaylistMenu && (
            <div className="playlist-menu">
              <div className="playlist-menu-header">Add to playlist</div>
              {playlists.length > 0 ? (
                playlists.map(playlist => (
                  <button
                    key={playlist.id}
                    className="playlist-menu-item"
                    onClick={() => handleAddToPlaylist(playlist.id)}
                  >
                    {playlist.name}
                    {playlist.songs.includes(song.id) && <span className="in-playlist">✓</span>}
                  </button>
                ))
              ) : (
                <div className="no-playlists">No playlists yet</div>
              )}
            </div>
          )}
        </div>
        
        <button className="play-button-card" onClick={handlePlay}>
          <span className="play-icon"></span>
        </button>
        
        {isCustomSong && (
          <button className="delete-button" onClick={handleDelete} title="Delete song">
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
}

export default SongList;
