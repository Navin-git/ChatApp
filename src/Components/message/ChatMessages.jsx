import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../../API/AxiosInstance";
import ChatHeader from "./ChatHeader";
import SendMessage from "./SendMessage";
import IndividualMessage from "./IndividualMessage";

const ChatMessages = ({
  active,
  toggle,
  setToggle,
  fetchingMessages,
  setFetchingMessages,
}) => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);

  const messagediv = useRef();

  const { _id: userId, username } = active;

  const getMessage = useRef();
  getMessage.current = async () => {
    await axiosInstance
      .post(`chat/`, { user: userId })
      .then((res) => {
        if (res?.data?.data) {
          const { messages, nextPage } = res.data.data;
          setNextPage(nextPage);
          setMessages(() => messages || []);
          setPage(() => (nextPage ? page + 1 : false));
        }
        messagediv.current.scrollTo(0, messagediv.current.scrollHeight);
      })
      .catch(() => {});

    setFetchingMessages(false);
  };

  const getscrollmessage = () => {
    axiosInstance
      .post(`chat?page=${page}`, { user: userId })
      .then((res) => {
        setMessages([...messages, ...res.data.data.messages]);
        setFetchingMessages(false);
        res.data.data.nextPage && setPage(page + 1);
      })
      .catch((err) => {
        setFetchingMessages(false);
      });
  };

  const HandelScroll = (event) => {
    if (messagediv.current.scrollTop === 0 && nextPage && !fetchingMessages) {
      setFetchingMessages(true);
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
            Array.isArray(messages) &&
            messages.map((data, index) => (
              <IndividualMessage key={index} {...data} />
            ))}
          {fetchingMessages && (
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
