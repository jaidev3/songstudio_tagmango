import { PLAY_SONG } from "./actionType";

export const playSong = (data) => {
  return {
    type: PLAY_SONG,
    payload: data,
  };
};
