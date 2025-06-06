import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSong } from '../redux/action';
import './AddSongPage.css';

const AddSongPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    song: '',
    artist: '',
    url: '',
    coverImage: '',
    duration: '',
    genre: '',
    releaseYear: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newSong = {
      ...formData,
      id: Date.now(),
      releaseYear: parseInt(formData.releaseYear),
      coverImage: formData.coverImage || `https://picsum.photos/200/${300 + Math.floor(Math.random() * 100)}`
    };
    
    dispatch(addSong(newSong));
    navigate('/');
  };

  return (
    <div className="add-song-page">
      <h1>Add New Song</h1>
      <form onSubmit={handleSubmit} className="add-song-form">
        <div className="form-group">
          <label htmlFor="song">Song Title *</label>
          <input
            type="text"
            id="song"
            name="song"
            value={formData.song}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="artist">Artist *</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">YouTube URL *</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration *</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="3:45"
            pattern="[0-9]{1,2}:[0-9]{2}"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre *</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select Genre</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="R&B">R&B</option>
            <option value="Country">Country</option>
            <option value="Electronic">Electronic</option>
            <option value="Jazz">Jazz</option>
            <option value="Classical">Classical</option>
            <option value="Indie">Indie</option>
            <option value="Folk">Folk</option>
            <option value="Metal">Metal</option>
            <option value="Coke Studio">Coke Studio</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="releaseYear">Release Year *</label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Song
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSongPage;