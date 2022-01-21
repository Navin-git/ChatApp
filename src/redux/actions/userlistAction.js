import {
  FETCH_USERLIST_REQUEST,
  FETCH_USERLIST_SUCCESS,
  FETCH_USERLIST_ERROR,
} from "./actionType";

export const fetchUSERRequest = () => {
  return {
    type: FETCH_USERLIST_REQUEST,
  };
};

export const fetchUSERSuccess = (data) => {
  return {
    type: FETCH_USERLIST_SUCCESS,
    payload: data,
  };
};

export const fetchUSERError = (error) => {
  return {
    type: FETCH_USERLIST_ERROR,
    payload: error,
  };
};

export const fetch_User = (axiosInstance) => {
  return async (dispatch) => {
    await axiosInstance
      .post("chat/users")
      .then((res) => {
        // setUsers(() => res?.data?.data?.users || []);
        dispatch(fetchUSERSuccess(res?.data?.data?.users || []));
        // setFetchingUsers(false);
      })
      .catch((err) => {
        dispatch(fetchUSERError(err));
      });
  };
};
