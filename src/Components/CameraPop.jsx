import React from "react";
import Camera from "../assets/icon/Camera";
const CameraPop = ({ Back, ClickPhoto, video, canvas }) => {
  return (
    <div className="fixed  h-screen w-screen bg-gray-500  z-20">
      <div className="relative mx-auto   w-full h-full">
        {" "}
        <video
          style={{ width: "100%", height: "100%" }}
          height={"100%"}
          ref={video}
          autoPlay
        ></video>
        <canvas
          className="absolute top-10 right-10"
          ref={canvas}
          width="320"
          height="240"
        ></canvas>
        <div className="absolute top-2 left-2">
          <div
            onClick={() => {
              Back();
            }}
            className=" bg-blue-500 cursor-pointer rounded-full flex justify-center items-center  w-14 h-14"
          >
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </div>
        <div className="absolute z-50 right-0 left-0 bottom-20 sm:bottom-12 mx-auto">
          <div className="flex justify-center gap-2">
            {" "}
            <div
              onClick={() => {
                ClickPhoto();
              }}
              className=" bg-blue-500 cursor-pointer rounded-full flex justify-center items-center  w-14 h-14"
            >
              <Camera />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CameraPop;
