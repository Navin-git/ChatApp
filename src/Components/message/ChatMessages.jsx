import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../../API/AxiosInstance";
import ChatHeader from "./ChatHeader";
import SendMessage from "./SendMessage";
import IndividualMessage from "./IndividualMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_message,
  fetch_scroll_message,
} from "../../redux/actions/messageAction";

const ChatMessages = ({
  active,
  toggle,
  setToggle,
  fetchingMessages,
  setFetchingMessages,
}) => {
  const [page, setPage] = useState(1);
  const [fetchingscrollMessages, setfetchingscrollMessages] = useState(false);
  const [nextpage, setNextPage] = useState(false);
  console.log("me", nextpage);

  const messagediv = useRef();
  const dispatch = useDispatch();
  const { messagedata } = useSelector((store) => store.messageReducer);

  const { _id: userId, username } = active;

  const getMessage = useRef();
  getMessage.current = async () => {
    await dispatch(
      fetch_message(
        axiosInstance,
        userId,
        setNextPage,
        setPage,
        page,
        messagediv
      )
    );

    console.log(messagediv.current.scrollHeight);
    setFetchingMessages(false);
    messagediv.current.scrollTo(0, messagediv.current.scrollHeight);
  };

  const getscrollmessage = async () => {
    await dispatch(
      fetch_scroll_message(
        axiosInstance,
        userId,
        setPage,
        page,
        messagedata,
        setNextPage
      )
    );
    setFetchingMessages(false);
    setfetchingscrollMessages(false);
  };

  const HandelScroll = (event) => {
    if (messagediv.current.scrollTop === 0 && nextpage && !fetchingMessages) {
      // setFetchingMessages(true);
      setfetchingscrollMessages(true);
      getscrollmessage();
    }
  };

  useEffect(() => {
    fetchingMessages && getMessage.current();
  }, [fetchingMessages]);

  return (
    <div className="flex h-full  flex-col">
      <ChatHeader username={username} toggle={toggle} setToggle={setToggle} />

      <div
        ref={messagediv}
        onScroll={HandelScroll}
        className=" flex-1 w-full  sbar mx-auto overflow-y-auto "
      >
        <div className="flex p-4 flex-col-reverse gap-5 w-full items-start">
          {!fetchingMessages &&
            Array.isArray(messagedata) &&
            messagedata.map((data, index) => (
              <IndividualMessage key={index} {...data} />
            ))}
          {fetchingscrollMessages && (
            <div className="text-gray-600 mx-auto font-medium">
              Loading . . .
            </div>
          )}
        </div>
      </div>
      <SendMessage active={active} getMessage={() => getMessage.current()} />
    </div>
  );
};

export default ChatMessages;
