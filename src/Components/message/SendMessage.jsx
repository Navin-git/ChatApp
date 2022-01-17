import React, { useState, useRef } from "react";
import Picker from "emoji-picker-react";
import axiosInstance from "../../API/AxiosInstance";
import CameraPop from "../../Components/CameraPop";
import Photo from "../../assets/icon/Photo";
import Emoji from "../../assets/icon/Emoji";
import Send from "../../assets/icon/Send";
import Camera from "../../assets/icon/Camera";
import Cross from "../../assets/icon/Cross";

const SendMessage = ({ active, getMessage }) => {
  const video = useRef();
  const canvas = useRef();
  const canvasa = useRef();
  const imgfile = useRef();

  const { _id: userId } = active;

  const [inputStr, setInputStr] = useState("");
  const [camera, setcamera] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [file, setfile] = useState("");
  const [localstream, setlocalstream] = useState("");
  const [imagepath, setimagepath] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/chat/send", { receiver: userId, message: inputStr })
      .then((res) => {
        setInputStr("");
        getMessage();
      });
  };

  const Back = () => {
    video.current.pause();
    localstream.getTracks()[0].stop();
    setcamera(false);
  };

  const ClickPhoto = () => {
    if (!video) {
      return;
    }
    let canvass = canvas.current;
    let ctx = canvass.getContext("2d");
    ctx.drawImage(video.current, 0, 0, canvass.width, canvass.height);
    let canvassa = canvasa.current;
    let ctxa = canvassa.getContext("2d");
    ctxa.drawImage(video.current, 0, 0, canvassa.width, canvassa.height);
    let image_data_url = canvass.toDataURL("image/jpeg");
    setimagepath(image_data_url);
  };

  const handleChangeImage = (e) => {
    const file = imgfile.current.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setfile(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      setfile(reader.result);
    } else {
      setfile("");
    }
  };

  return (
    <React.Fragment>
      {camera && (
        <CameraPop
          Back={Back}
          ClickPhoto={ClickPhoto}
          video={video}
          canvas={canvas}
        />
      )}
      <form
        onSubmit={handleMessageSubmit}
        className="flex w-full relative items-center mx-auto bg-gradient-to-r from-blue-400 to-blue-400 cursor-pointer  p-2 gap-2"
      >
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

        <Camera
          handleClick={async () => {
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
        />
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

          {/* Emoji picker */}
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
    </React.Fragment>
  );
};

export default SendMessage;
