import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSongs, loadFavorites, loadPlaylists } from "../redux/action";
import { FaDownload, FaUpload, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import "./ExportImportPage.css";

function ExportImportPage() {
  const dispatch = useDispatch();
  const customSongs = useSelector((state) => state.songs);
  const favorites = useSelector((state) => state.favorites);
  const playlists = useSelector((state) => state.playlists);
  
  const [importStatus, setImportStatus] = useState(null);
  const [exportStatus, setExportStatus] = useState(null);

  const handleExport = () => {
    try {
      // Prepare data for export
      const exportData = {
        version: "1.0",
        exportDate: new Date().toISOString(),
        data: {
          customSongs,
          favorites,
          playlists
        }
      };

      // Convert to JSON string
      const jsonString = JSON.stringify(exportData, null, 2);
      
      // Create blob and download link
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      // Set filename with current date
      const date = new Date().toISOString().split('T')[0];
      link.download = `songstudio-data-${date}.json`;
      link.href = url;
      
      // Trigger download
      link.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      
      setExportStatus({ type: 'success', message: 'Data exported successfully!' });
      setTimeout(() => setExportStatus(null), 3000);
    } catch (error) {
      setExportStatus({ type: 'error', message: 'Failed to export data. Please try again.' });
      setTimeout(() => setExportStatus(null), 3000);
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Validate the imported data structure
        if (!importedData.data || !importedData.version) {
          throw new Error("Invalid file format");
        }

        const { customSongs, favorites, playlists } = importedData.data;

        // Update Redux store
        if (customSongs && Array.isArray(customSongs)) {
          dispatch(loadSongs(customSongs));
          localStorage.setItem('customSongs', JSON.stringify(customSongs));
        }

        if (favorites && Array.isArray(favorites)) {
          dispatch(loadFavorites(favorites));
          localStorage.setItem('favorites', JSON.stringify(favorites));
        }

        if (playlists && Array.isArray(playlists)) {
          dispatch(loadPlaylists(playlists));
          localStorage.setItem('playlists', JSON.stringify(playlists));
        }

        setImportStatus({ 
          type: 'success', 
          message: `Successfully imported: ${customSongs?.length || 0} songs, ${favorites?.length || 0} favorites, ${playlists?.length || 0} playlists` 
        });
        
        // Reset file input
        event.target.value = '';
        
        setTimeout(() => setImportStatus(null), 5000);
      } catch (error) {
        setImportStatus({ 
          type: 'error', 
          message: 'Failed to import data. Please check the file format.' 
        });
        event.target.value = '';
        setTimeout(() => setImportStatus(null), 5000);
      }
    };

    reader.readAsText(file);
  };

  const getDataSummary = () => {
    return {
      customSongs: customSongs.length,
      favorites: favorites.length,
      playlists: playlists.length,
      totalPlaylistSongs: playlists.reduce((acc, playlist) => acc + playlist.songs.length, 0)
    };
  };

  const summary = getDataSummary();

  return (
    <div className="export-import-page">
      <div className="page-header">
        <h1 className="page-title">Data Management</h1>
        <p className="page-subtitle">Export or import your music library data</p>
      </div>

      <div className="data-summary">
        <h2>Current Data Summary</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Custom Songs</span>
            <span className="summary-value">{summary.customSongs}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Favorites</span>
            <span className="summary-value">{summary.favorites}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Playlists</span>
            <span className="summary-value">{summary.playlists}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Playlist Songs</span>
            <span className="summary-value">{summary.totalPlaylistSongs}</span>
          </div>
        </div>
      </div>

      <div className="actions-container">
        <div className="action-card">
          <div className="action-icon">
            <FaDownload />
          </div>
          <h3>Export Data</h3>
          <p>Download all your custom songs, favorites, and playlists as a JSON file</p>
          <button className="action-button export-button" onClick={handleExport}>
            <FaDownload /> Export All Data
          </button>
          {exportStatus && (
            <div className={`status-message ${exportStatus.type}`}>
              {exportStatus.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
              {exportStatus.message}
            </div>
          )}
        </div>

        <div className="action-card">
          <div className="action-icon">
            <FaUpload />
          </div>
          <h3>Import Data</h3>
          <p>Upload a previously exported JSON file to restore your data</p>
          <label className="action-button import-button">
            <FaUpload /> Import Data
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
          {importStatus && (
            <div className={`status-message ${importStatus.type}`}>
              {importStatus.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
              {importStatus.message}
            </div>
          )}
        </div>
      </div>

      <div className="info-section">
        <h3>Important Notes</h3>
        <ul>
          <li>Export creates a JSON file containing all your custom songs, favorites, and playlists</li>
          <li>The export file can be used to backup your data or transfer it to another device</li>
          <li>Importing will replace your current data with the data from the imported file</li>
          <li>Only import files that were exported from this application</li>
          <li>Default songs from the app are not included in the export</li>
        </ul>
      </div>
    </div>
  );
}

export default ExportImportPage;