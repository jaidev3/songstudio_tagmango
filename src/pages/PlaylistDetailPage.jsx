import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPlaylist, updatePlaylist } from "../redux/action";
import SongList from "../components/SongList";
import { songsData } from "../data";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import "./PlaylistDetailPage.css";

function PlaylistDetailPage() {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const playlists = useSelector((state) => state.playlists);
  const customSongs = useSelector((state) => state.songs);
  
  const [playlist, setPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    const currentPlaylist = playlists.find(p => p.id === parseInt(playlistId));
    if (currentPlaylist) {
      setPlaylist(currentPlaylist);
      setEditedName(currentPlaylist.name);
      setEditedDescription(currentPlaylist.description || "");
      
      // Get all songs (default + custom)
      const allSongs = [...songsData, ...customSongs];
      // Filter songs that are in this playlist
      const filtered = allSongs.filter(song => currentPlaylist.songs.includes(song.id));
      setPlaylistSongs(filtered);
    } else {
      navigate("/playlists");
    }
  }, [playlistId, playlists, customSongs, navigate]);

  const handleSaveEdit = () => {
    if (editedName.trim()) {
      dispatch(updatePlaylist(parseInt(playlistId), {
        name: editedName,
        description: editedDescription
      }));
      setIsEditing(false);
    }
  };

  const handleRemoveFromPlaylist = (songId) => {
    dispatch(removeFromPlaylist(parseInt(playlistId), songId));
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="playlist-detail-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate("/playlists")}>
          <FaArrowLeft /> Back to Playlists
        </button>
        
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="edit-input"
              placeholder="Playlist name"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="edit-textarea"
              placeholder="Description (optional)"
              rows="2"
            />
            <div className="edit-actions">
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="playlist-header-info">
            <div>
              <h1 className="page-title">{playlist.name}</h1>
              <p className="page-subtitle">
                {playlist.description || "No description"}
              </p>
              <span className="playlist-stats">
                {playlistSongs.length} song{playlistSongs.length !== 1 ? 's' : ''}
              </span>
            </div>
            <button className="edit-playlist-btn" onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit
            </button>
          </div>
        )}
      </div>

      {playlistSongs.length > 0 ? (
        <div className="songs-grid">
          {playlistSongs.map((song) => (
            <div key={song.id} className="playlist-song-item">
              <SongList song={song} />
              <button
                className="remove-from-playlist-btn"
                onClick={() => handleRemoveFromPlaylist(song.id)}
                title="Remove from playlist"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No songs in this playlist</h3>
          <p>Add songs from the home page to this playlist</p>
          <button className="browse-songs-btn" onClick={() => navigate("/")}>
            Browse Songs
          </button>
        </div>
      )}
    </div>
  );
}

export default PlaylistDetailPage;