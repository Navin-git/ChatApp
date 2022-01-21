import React from "react";
import moment from "moment";
const SidebarList = ({ listdata, handleChange, active }) => {
  return (
    <div>
      {Array.isArray(listdata) &&
        listdata.map((user, index) => {
          const { username, _id, lastMessage } = user;
          return (
            <div
              onClick={() => handleChange(user)}
              key={index}
              className={`flex my-1 rounded-lg flex-shrink-0 mr-2 hover:mr-0 focus:bg-blue-600 hover:bg-blue-600 cursor-pointer  p-2 gap-2 ${
                active?._id === _id ? "bg-blue-600" : ""
              }`}
            >
              <div className="relative w-12 h-12">
                <img
                  className="rounded-full border border-gray-100 shadow-sm"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="user profile"
                />
                <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
              </div>
              <div className="flex-1 text-left text-white">
                <h3 className="font-semibold">{username}</h3>
                {lastMessage && (
                  <div className="flex gap-1 items-center">
                    <p className="text-sm flex-1 lastMsg overflow-hidden  text-gray-100">
                      {lastMessage && lastMessage.message}
                    </p>
                    <span className="text-xs  self-center">
                      {lastMessage &&
                        moment(lastMessage.time).format("ddd MMM DD YYYY")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default SidebarList;
