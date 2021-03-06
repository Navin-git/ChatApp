import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
} from "../actions/actionType";

const initialState = {
  posts: [],
  fetching: false,
  error: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POST_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        posts: payload,
        fetching: false,
      };
    case FETCH_POST_ERROR:
      return {
        ...state,
        error: payload,
        fetching: false,
      };
    default:
      return state;
  }
};

export default reducer;
