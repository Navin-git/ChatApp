import {
  FETCH_USERLIST_REQUEST,
  FETCH_USERLIST_SUCCESS,
  FETCH_USERLIST_ERROR,
} from "../actions/actionType";

const initialState = {
  userlistdata: [],
  fetching: false,
  error: [],
};

const userListReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USERLIST_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_USERLIST_SUCCESS:
      return {
        ...state,
        userlistdata: payload,
        fetching: false,
      };
    case FETCH_USERLIST_ERROR:
      return {
        ...state,
        error: payload,
        fetching: false,
      };
    default:
      return state;
  }
};

export default userListReducer;
