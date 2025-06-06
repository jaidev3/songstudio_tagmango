import { 
  PLAY_SONG, 
  SET_CURRENT_SONG_DATA,
  ADD_SONG, 
  LOAD_SONGS, 
  DELETE_SONG,
  TOGGLE_FAVORITE,
  LOAD_FAVORITES,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  LOAD_PLAYLISTS,
  UPDATE_PLAYLIST
} from "./actionType";

export const playSong = (data) => {
  return {
    type: PLAY_SONG,
    payload: data,
  };
};

export const setCurrentSongData = (songData) => {
  return {
    type: SET_CURRENT_SONG_DATA,
    payload: songData,
  };
};

export const addSong = (song) => {
  return {
    type: ADD_SONG,
    payload: song,
  };
};

export const loadSongs = (songs) => {
  return {
    type: LOAD_SONGS,
    payload: songs,
  };
};

export const deleteSong = (songId) => {
  return {
    type: DELETE_SONG,
    payload: songId,
  };
};

export const toggleFavorite = (songId) => {
  return {
    type: TOGGLE_FAVORITE,
    payload: songId,
  };
};

export const loadFavorites = (favorites) => {
  return {
    type: LOAD_FAVORITES,
    payload: favorites,
  };
};

export const createPlaylist = (playlist) => {
  return {
    type: CREATE_PLAYLIST,
    payload: playlist,
  };
};

export const deletePlaylist = (playlistId) => {
  return {
    type: DELETE_PLAYLIST,
    payload: playlistId,
  };
};

export const addToPlaylist = (playlistId, songId) => {
  return {
    type: ADD_TO_PLAYLIST,
    payload: { playlistId, songId },
  };
};

export const removeFromPlaylist = (playlistId, songId) => {
  return {
    type: REMOVE_FROM_PLAYLIST,
    payload: { playlistId, songId },
  };
};

export const loadPlaylists = (playlists) => {
  return {
    type: LOAD_PLAYLISTS,
    payload: playlists,
  };
};

export const updatePlaylist = (playlistId, updates) => {
  return {
    type: UPDATE_PLAYLIST,
    payload: { playlistId, updates },
  };
};
