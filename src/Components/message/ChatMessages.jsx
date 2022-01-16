import React, { useState, useRef, useEffect } from "react";
import Picker from "emoji-picker-react";
import moment from "moment";
import axiosInstance from "../../API/AxiosInstance";
import Photo from "../../assets/icon/Photo";
import Emoji from "../../assets/icon/Emoji";
import Send from "../../assets/icon/Send";
import ChatHeader from "./ChatHeader";

const ChatMessages = ({
  showPicker,
  setShowPicker,
  imgfile,
  handleChangeImage,
  video,
  canvasa,
  active,
  setcamera,
  toggle,
  setToggle,
  file,
  setfile,
  imagepath,
  setimagepath,
  setlocalstream,
  fetchingMessages,
  setFetchingMessages,
}) => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [inputStr, setInputStr] = useState("");

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

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/chat/send", { receiver: userId, message: inputStr })
      .then((res) => {
        setInputStr("");
        getMessage.current();
      });
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
            messages.map((data, index) => {
              const { message, received, time } = data;
              return (
                <div
                  key={index}
                  className={`flex w-full  ${
                    !received ? "justify-end text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`flex gap-2 ${!received && "flex-row-reverse"}`}
                  >
                    {received && (
                      <div className="relative w-9 h-9 self-center">
                        <img
                          className="rounded-full border border-gray-100 shadow-sm"
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          alt="user profile"
                        />
                        <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
                      </div>
                    )}
                    <div
                      className={`rounded-3xl max-w-md text-lg text-white py-1 px-2 ${
                        !received ? "bg-blue-400" : "bg-gray-400"
                      }`}
                    >
                      {message}
                    </div>
                    <div className="text-xs flex-shrink-0 text-gray-400 self-center">
                      {moment(time).format("ddd MMM DD YYYY")}
                    </div>
                  </div>
                </div>
              );
            })}
          {fetchingMessages && (
            <div className="text-gray-600 mx-auto font-medium">
              Loading . . .
            </div>
          )}
        </div>
      </div>
      <form
        onSubmit={handleMessageSubmit}
        className="flex w-full relative items-center mx-auto bg-gradient-to-r from-blue-400 to-blue-400 cursor-pointer  p-2 gap-2"
      >
        {
          <div
            onClick={() => {
              setimagepath("");
              setfile("");
            }}
            className={`absolute -top-full flex gap-2 bg-blue-200 ${
              imagepath || file ? " h-20 p-2" : "hidden"
            }`}
          >
            <div className="p-1 absolute z-10 top-1 right-1 rounded-full bg-blue-500 text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <canvas
              ref={canvasa}
              className={` relative ${imagepath ? "h-16" : "h-0"}`}
            ></canvas>
            <img alt="" className="h-full" src={file} />
          </div>
        }
        <svg
          onClick={async () => {
            await setcamera(true);
            if (!video) {
              return;
            }
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then((stream) => {
                let videos = video.current;
                videos.srcObject = stream;
                setlocalstream(stream);
                videos.play();
              });
          }}
          className="w-7 text-white h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div>
          <label htmlFor="imgfile">
            <Photo />
          </label>
          <input
            id="imgfile"
            onChange={handleChangeImage}
            className="hidden"
            type={"file"}
            ref={imgfile}
          />
        </div>

        <div className="ring-offset-1 overflow-hidden ring-1 ring-white rounded-full  flex flex-1 items-center relative w-11/12  mx-auto my-2 ">
          <textarea
            placeholder="Aa"
            className="rounded-2xl pr-10 hover:bg-opacity-20  transition focus:outline-none duration-200 py-2 bg-gray-500 bg-opacity-10 placeholder-gray-50 pl-4 backdrop-blur-sm text-gray-50 w-full h-10"
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
          />
          <Emoji setShowPicker={setShowPicker} />
          {showPicker && (
            <div>
              <div className="absolute bottom-full z-20 w-72 right-2">
                <Picker
                  pickerStyle={{ width: "100%" }}
                  onEmojiClick={onEmojiClick}
                />
              </div>
              <div
                onClick={() => {
                  setShowPicker(false);
                }}
                className="h-screen top-0 left-0  z-10 fixed w-full"
              ></div>
            </div>
          )}
        </div>
        <button type="submit" className="p-2 rounded-full">
          <Send />
        </button>
      </form>
    </div>
  );
};
export default ChatMessages;
