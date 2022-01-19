import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_ERROR,
} from "./actionType";

export const fetchMESSAGERequest = () => {
  return {
    type: FETCH_MESSAGE_REQUEST,
  };
};

export const fetchMESSAGESuccess = (data) => {
  return {
    type: FETCH_MESSAGE_SUCCESS,
    payload: data,
  };
};

export const fetchMESSAGEError = (error) => {
  return {
    type: FETCH_MESSAGE_ERROR,
    payload: error,
  };
};

export const fetch_message = (
  axiosInstance,
  userId,
  setNextPage,
  setPage,
  page,
  messagediv
) => {
  return async (dispatch) => {
    await axiosInstance
      .post(`chat/`, { user: userId })
      .then((res) => {
        if (res?.data?.data) {
          const { messages, nextPage } = res.data.data;
          setNextPage(nextPage);
          dispatch(fetchMESSAGESuccess(messages || []));
          //   setMessages(() => messages || []);
          setPage(() => (nextPage ? page + 1 : false));
          messagediv.current.scrollTo(0, messagediv.current.scrollHeight);
        }
      })
      .catch((err) => {
        dispatch(fetchMESSAGEError(err));
      });
  };
};
export const fetch_scroll_message = (
  axiosInstance,
  userId,
  setPage,
  page,
  messagedata,
  setNextPage
) => {
  return async (dispatch) => {
    await axiosInstance
      .post(`chat?page=${page}`, { user: userId })
      .then((res) => {
        dispatch(
          fetchMESSAGESuccess([...messagedata, ...res.data.data.messages])
        );
        //   setMessages([...messages, ...res.data.data.messages]);
        //   setFetchingMessages(false);
        setNextPage(res.data.data.nextPage);
        res.data.data.nextPage && setPage(page + 1);
      })
      .catch((err) => {
        //   setFetchingMessages(false);
        dispatch(fetchMESSAGEError(err));
      });
  };
};
