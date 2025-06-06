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

const initState = { 
  loading: false, 
  song: "", 
  currentSongData: null,
  errors: false, 
  songs: [], 
  favorites: [],
  playlists: []
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case PLAY_SONG:
      return {
        ...state,
        song: payload,
      };

    case SET_CURRENT_SONG_DATA:
      return {
        ...state,
        currentSongData: payload,
      };

    case ADD_SONG:
      const updatedSongs = [...state.songs, payload];
      localStorage.setItem('customSongs', JSON.stringify(updatedSongs));
      return {
        ...state,
        songs: updatedSongs,
      };

    case LOAD_SONGS:
      return {
        ...state,
        songs: payload,
      };

    case DELETE_SONG:
      const filteredSongs = state.songs.filter(song => song.id !== payload);
      localStorage.setItem('customSongs', JSON.stringify(filteredSongs));
      return {
        ...state,
        songs: filteredSongs,
      };

    case TOGGLE_FAVORITE:
      const updatedFavorites = state.favorites.includes(payload)
        ? state.favorites.filter(id => id !== payload)
        : [...state.favorites, payload];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return {
        ...state,
        favorites: updatedFavorites,
      };

    case LOAD_FAVORITES:
      return {
        ...state,
        favorites: payload,
      };

    case CREATE_PLAYLIST:
      const newPlaylists = [...state.playlists, payload];
      localStorage.setItem('playlists', JSON.stringify(newPlaylists));
      return {
        ...state,
        playlists: newPlaylists,
      };

    case DELETE_PLAYLIST:
      const remainingPlaylists = state.playlists.filter(playlist => playlist.id !== payload);
      localStorage.setItem('playlists', JSON.stringify(remainingPlaylists));
      return {
        ...state,
        playlists: remainingPlaylists,
      };

    case ADD_TO_PLAYLIST:
      const playlistsWithSong = state.playlists.map(playlist => {
        if (playlist.id === payload.playlistId && !playlist.songs.includes(payload.songId)) {
          return { ...playlist, songs: [...playlist.songs, payload.songId] };
        }
        return playlist;
      });
      localStorage.setItem('playlists', JSON.stringify(playlistsWithSong));
      return {
        ...state,
        playlists: playlistsWithSong,
      };

    case REMOVE_FROM_PLAYLIST:
      const playlistsWithoutSong = state.playlists.map(playlist => {
        if (playlist.id === payload.playlistId) {
          return { ...playlist, songs: playlist.songs.filter(id => id !== payload.songId) };
        }
        return playlist;
      });
      localStorage.setItem('playlists', JSON.stringify(playlistsWithoutSong));
      return {
        ...state,
        playlists: playlistsWithoutSong,
      };

    case LOAD_PLAYLISTS:
      return {
        ...state,
        playlists: payload,
      };

    case UPDATE_PLAYLIST:
      const updatedPlaylists = state.playlists.map(playlist => {
        if (playlist.id === payload.playlistId) {
          return { ...playlist, ...payload.updates };
        }
        return playlist;
      });
      localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
      return {
        ...state,
        playlists: updatedPlaylists,
      };

    default:
      return state;
  }
};

export { reducer };
