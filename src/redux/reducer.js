import { PLAY_SONG } from "./actionType";

const initState = { loading: false, song: "", errors: false };

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case PLAY_SONG:
      return {
        ...state,
        song: payload,
      };

    default:
      return state;
  }
};

export { reducer };
