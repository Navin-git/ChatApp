import React from "react";
import Cross from "../../assets/icon/Cross";
const PreviewImg = ({ setimagepath, setfile, canvasa, imagepath, file }) => {
  return (
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
        <Cross />
      </div>
      <canvas
        ref={canvasa}
        className={` relative ${imagepath ? "h-16" : "h-0"}`}
      ></canvas>
      <img alt="" className="h-full" src={file} />
    </div>
  );
};
export default PreviewImg;
