import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
  SEARCH_POST_REQUEST,
  SEARCH_POST_SUCCESS,
  SEARCH_POST_ERROR,
} from "./actionType";

export const fetchPostRequest = () => {
  return {
    type: FETCH_POST_REQUEST,
  };
};

export const fetchPostSuccess = (data) => {
  return {
    type: FETCH_POST_SUCCESS,
    payload: data,
  };
};

export const fetchPostError = (error) => {
  return {
    type: FETCH_POST_ERROR,
    payload: error,
  };
};

// Search Submit

export const searchPostRequest = () => {
  return {
    type: SEARCH_POST_REQUEST,
  };
};

export const searchPostSuccess = (data) => {
  return {
    type: SEARCH_POST_SUCCESS,
    payload: data,
  };
};

export const searchPostError = (error) => {
  return {
    type: SEARCH_POST_ERROR,
    payload: error,
  };
};

export const fetch_User = (axiosInstance) => {
  return async (dispatch) => {
    await axiosInstance
      .post("chat/users")
      .then((res) => {
        // setUsers(() => res?.data?.data?.users || []);
        dispatch(searchPostSuccess(res?.data?.data?.users || []));
        // setFetchingUsers(false);
      })
      .catch((err) => {
        dispatch(searchPostError(err));
      });
  };
};
export const handleSearchSubmit = (axiosInstance, search, page) => {
  return async (dispatch) => {
    await axiosInstance
      .get(`user/search?user=${search}&page=${page}`)
      .then((res) => {
        dispatch(searchPostSuccess(res?.data?.data?.users || []));
        // setUsers(() => res?.data?.data?.users || []);
      })
      .catch((err) => {
        dispatch(searchPostError(err));
      });
  };
};
