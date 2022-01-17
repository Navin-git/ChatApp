import React from "react";

const ChatHeader = ({ toggle, setToggle, username }) => {
  return (
    <div className="flex  bg-gradient-to-r from-blue-400 to-blue-400 justify-between">
      <div className="flex w-full  cursor-pointer  p-2 gap-2">
        <div className="relative w-12 h-10">
          <img
            className="rounded-full border border-gray-100 shadow-sm"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="user profile"
          />
          <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
        </div>
        <div className="flex-1 text-left text-white">
          <h3 className="font-semibold">{username}</h3>
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
        fill="red"
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
  );
};

export default ChatHeader;
