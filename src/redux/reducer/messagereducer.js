import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_ERROR,
} from "../actions/actionType";

const initialState = {
  messagedata: [],
  fetching: false,
  error: [],
};

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_MESSAGE_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        messagedata: payload,
        fetching: false,
      };
    case FETCH_MESSAGE_ERROR:
      return {
        ...state,
        error: payload,
        fetching: false,
      };
    default:
      return state;
  }
};

export default messageReducer;
