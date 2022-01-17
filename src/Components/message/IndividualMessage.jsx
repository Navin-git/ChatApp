import React from "react";
import moment from "moment";

const IndividualMessage = ({ received, message, time }) => {
  return (
    <div
      className={`flex w-full  ${
        !received ? "justify-end text-right" : "text-left"
      }`}
    >
      <div className={`flex gap-2 ${!received && "flex-row-reverse"}`}>
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
};

export default IndividualMessage;
