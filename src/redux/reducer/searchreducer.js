import {
  SEARCH_POST_REQUEST,
  SEARCH_POST_SUCCESS,
  SEARCH_POST_ERROR,
} from "../actions/actionType";

const initialState = {
  searchdata: [],
  fetching: false,
  error: [],
};

const searchreducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_POST_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case SEARCH_POST_SUCCESS:
      return {
        ...state,
        searchdata: payload,
        fetching: false,
      };
    case SEARCH_POST_ERROR:
      return {
        ...state,
        error: payload,
        fetching: false,
      };
    default:
      return state;
  }
};

export default searchreducer;
