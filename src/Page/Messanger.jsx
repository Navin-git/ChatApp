import React from "react";
import Picker from "emoji-picker-react";
import moment from "moment";

const Messanger = ({
  onEmojiClick,
  setInputStr,
  showPicker,
  setShowPicker,
  inputStr,
  imgfile,
  Handelimage,
  setlocalstream,
  video,
  setcamera,
  canvasa,
  file,
  imagepath,
  setfile,
  setimagepath,
  HandelMessageSubmit,
  setToggle,
  toggle,
  messagediv,
  HandelScroll,
  massagedatas,
  loadMessage,
  getscrollmessage,
  massagedata,
}) => {
  return (
    <div className="flex h-full  flex-col">
      <div className="flex  bg-gradient-to-r from-blue-400 to-blue-400 justify-between">
        <div className="flex w-full  cursor-pointer  p-2 gap-2">
          <div className="relative w-12 h-10">
            <img
              className="rounded-full border border-gray-100 shadow-sm"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="user image"
            />
            <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
          </div>
          <div className="flex-1 text-left text-white">
            <h3 className="font-semibold">Nabin Kharel</h3>
            <div className="flex gap-1 items-center">
              <p className="text-sm flex-1 lastMsg overflow-hidden text-gray-100">
                Active Now
              </p>
            </div>
          </div>
        </div>
        <svg
          onClick={() => {
            setToggle(!toggle);
          }}
          className="w-6 sm:hidden cursor-pointer bg-transparent mr-2 text-white self-center h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </div>

      <div
        ref={messagediv}
        onScroll={HandelScroll}
        className=" flex-1 w-full  sbar mx-auto overflow-y-auto "
      >
        <div className="flex p-4 flex-col-reverse gap-5 w-full items-start">
          {Array.isArray(massagedatas) &&
            massagedatas.map((data, index) => {
              const { message, recevide, time, _id } = data;
              return (
                <div
                  key={index}
                  className={`flex w-full  ${
                    !recevide ? "justify-end text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`flex gap-2 ${!recevide && "flex-row-reverse"}`}
                  >
                    {recevide && (
                      <div className="relative w-9 h-9 self-center">
                        <img
                          className="rounded-full border border-gray-100 shadow-sm"
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          alt="user image"
                        />
                        <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
                      </div>
                    )}
                    <div
                      className={`rounded-3xl max-w-md text-lg text-white py-1 px-2 ${
                        !recevide ? "bg-blue-400" : "bg-gray-400"
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
          {loadMessage && (
            <div className="text-gray-600 mx-auto font-medium">
              Loading . . .
            </div>
          )}
        </div>
      </div>
      <form
        onSubmit={HandelMessageSubmit}
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
            <svg
              className="w-7 h-7 cursor-pointer text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>
          <input
            Id="imgfile"
            onChange={Handelimage}
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
          <svg
            onClick={() => setShowPicker((val) => !val)}
            className="w-6 h-6 absolute right-4 text-gray-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {/* <img
        className="emoji-icon"
        src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
        onClick={() => setShowPicker((val) => !val)}
      /> */}
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
          <svg
            className="w-6 text-white transform rotate-90 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};
export default Messanger;
