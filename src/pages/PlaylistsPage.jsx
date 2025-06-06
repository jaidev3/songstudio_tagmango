import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPlaylists, createPlaylist, deletePlaylist } from "../redux/action";
import { FaPlus, FaTrash, FaMusic, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PlaylistsPage.css";

function PlaylistsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playlists = useSelector((state) => state.playlists);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");

  useEffect(() => {
    // Load playlists from localStorage on mount
    const storedPlaylists = localStorage.getItem('playlists');
    if (storedPlaylists) {
      dispatch(loadPlaylists(JSON.parse(storedPlaylists)));
    }
  }, [dispatch]);

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      const newPlaylist = {
        id: Date.now(),
        name: newPlaylistName,
        description: newPlaylistDescription,
        songs: [],
        createdAt: new Date().toISOString()
      };
      dispatch(createPlaylist(newPlaylist));
      setNewPlaylistName("");
      setNewPlaylistDescription("");
      setShowCreateModal(false);
    }
  };

  const handleDeletePlaylist = (playlistId, playlistName) => {
    if (window.confirm(`Are you sure you want to delete "${playlistName}"?`)) {
      dispatch(deletePlaylist(playlistId));
    }
  };

  const handleViewPlaylist = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <div className="playlists-page">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">My Playlists</h1>
            <p className="page-subtitle">
              {playlists.length} playlist{playlists.length !== 1 ? 's' : ''} created
            </p>
          </div>
          <button
            className="create-playlist-btn"
            onClick={() => setShowCreateModal(true)}
          >
            <FaPlus /> Create Playlist
          </button>
        </div>
      </div>

      {playlists.length > 0 ? (
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <div 
              key={playlist.id} 
              className="playlist-card"
              onClick={() => handleViewPlaylist(playlist.id)}
            >
              <div className="playlist-cover">
                <FaMusic className="playlist-icon" />
              </div>
              <div className="playlist-info">
                <h3>{playlist.name}</h3>
                <p>{playlist.description || "No description"}</p>
                <span className="playlist-meta">
                  {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="playlist-actions">
                <button
                  className="delete-playlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePlaylist(playlist.id, playlist.name);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FaMusic className="empty-icon" />
          <h3>No playlists yet</h3>
          <p>Create your first playlist to organize your favorite songs</p>
          <button
            className="create-playlist-btn"
            onClick={() => setShowCreateModal(true)}
          >
            <FaPlus /> Create Your First Playlist
          </button>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Playlist</h2>
            <form onSubmit={handleCreatePlaylist}>
              <div className="form-group">
                <label htmlFor="playlist-name">Playlist Name *</label>
                <input
                  type="text"
                  id="playlist-name"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="Enter playlist name"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="playlist-description">Description</label>
                <textarea
                  id="playlist-description"
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                  placeholder="Add a description (optional)"
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Playlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistsPage;