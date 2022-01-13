import React from "react";
import { useState, useRef } from "react";
import Picker from "emoji-picker-react";
const Home = () => {
  const video = useRef();
  const canvas = useRef();
  const canvasa = useRef();
  const imgfile = useRef();

  const UserList = [
    {
      user: "Nabin Kharel",
      lastmassage: "User last massage",
      date: "24th Nov, 2021",
    },
    {
      user: "Dipendra Paudel",
      lastmassage: "User last  massage",
      date: "24th Nov, 2021",
    },
    {
      user: "Ram Poudal",
      lastmassage: "User last massage",
      date: "24th Nov, 2021",
    },
    {
      user: "Hari BK",
      lastmassage: "User last massage",
      date: "24th Nov, 2021",
    },
    {
      user: "Daddys little princes",
      lastmassage: "User last massage",
      date: "24th Nov, 2021",
    },
    {
      user: "Papa ki pari",
      lastmassage: "User last massage",
      date: "24th Nov, 2021",
    },
    {
      user: "Handsome kta mho",
      lastmassage: "User last massage",
      date: "24th Nov, 2021",
    },
    {
      user: "Handsome kta mho",
      lastmassage: "User last massage",
      date: "24th Nov, 2021",
    },
    {
      user: "Handsome kta mho",
      lastmassage: "User last massage",
      date: "24th Nov, 2021",
    },
    {
      user: "Handsome kta mho",
      lastmassage: "User last massage",
      date: "24th Nov, 2021",
    },
  ];
  const massage = [
    {
      massage: "Hey Nabin",
      self: false,
      date: "24th Nov, 2021",
    },
    {
      massage: "How are you?",
      self: false,
      date: "24th Nov, 2021",
    },
    {
      massage: "Hi",
      self: true,
      date: "24th Nov, 2021",
    },
    {
      massage: "I am fine.dsf  dsfds f f dsfefewf dsfefsdf e efsdfdsfe ",
      self: true,
      date: "24th Nov, 2021",
    },
    {
      massage: "Are you free today?",
      self: false,
      date: "24th Nov, 2021",
    },
  ];
  const [active, setActive] = useState(0);
  const [camera, setcamera] = useState(false);
  const [localstream, setlocalstream] = useState("");
  const [imagepath, setimagepath] = useState("");
  const [file, setfile] = useState("");
  const [imgs, setimgs] = useState([]);

  console.log("camera", camera, "localstream", localstream);

  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    // setShowPicker(false);
  };
  const [toggle, setToggle] = useState(false);
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
    console.log(video);
    let ctx = canvass.getContext("2d");
    ctx.drawImage(video.current, 0, 0, canvass.width, canvass.height);
    let canvassa = canvasa.current;
    console.log(canvasa);
    let ctxa = canvassa.getContext("2d");
    ctxa.drawImage(video.current, 0, 0, canvassa.width, canvassa.height);
    let image_data_url = canvass.toDataURL("image/jpeg");
    setimagepath(image_data_url);
    console.log("me", image_data_url);
  };
  const Handelimage = (e) => {
    // setimgs(e.target.files);
    // var file = imgfile.current.files[0];
    // var reader = new FileReader();
    // var url = reader.readAsDataURL(file);
    // console.log(url); // Would see a path?
    // // TODO: concat files for setState

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
    <div className="h-screen">
      {camera && (
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
                  <svg
                    className="w-8 text-white h-8"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="flex h-full ">
        <div
          style={{ transition: "0.3s ease" }}
          className={`sm:border-r fixed sm:w-72 max-h-screen overflow-hidden sm:static z-10 flex flex-col shadow-lg  bg-gradient-to-r from-blue-500 to-blue-400 border-gray-100 ${
            toggle ? "w-72" : "w-0"
          }`}
        >
          {/* Logo here */}
          <h1 className=" text-3xl flex gap-1 py-3  border-b-2 border-white text-center justify-center font-bold text-white">
            Messenger
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </h1>
          <br />
          {/* Search bar */}
          <div>
            <div className="ring-offset-1 ring-1 ring-white rounded-full  flex flex-1 items-center relative w-11/12  mx-auto my-2 ">
              <input
                placeholder="enter your keyboard"
                className="rounded-2xl pr-10 hover:bg-opacity-20  transition focus:outline-none duration-200  bg-gray-500 bg-opacity-10 text-sm placeholder-gray-50 pl-4 backdrop-blur-sm text-gray-50 w-full h-10"
              />
              {/* <SearchIcon className="absolute right-4 text-gray-50" /> */}
              <svg
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <br />
          {/* User List */}
          <div
            style={{ width: "95%" }}
            className=" flex-1 sbar mx-auto overflow-y-auto "
          >
            {UserList.map((data, index) => {
              const { user, lastmassage, date } = data;
              return (
                <div
                  onClick={() => {
                    setActive(index);
                  }}
                  key={index}
                  className={`flex my-1 rounded-lg flex-shrink-0 mr-2 hover:mr-0 focus:bg-blue-600 hover:bg-blue-600 cursor-pointer  p-2 gap-2 ${
                    active === index ? "bg-blue-600" : ""
                  }`}
                >
                  <div className="relative w-12 h-12">
                    <img
                      className="rounded-full border border-gray-100 shadow-sm"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="user image"
                    />
                    <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
                  </div>
                  <div className="flex-1 text-left text-white">
                    <h3 className="font-semibold">{user}</h3>
                    <div className="flex gap-1 items-center">
                      <p className="text-sm flex-1 lastMsg overflow-hidden  text-gray-100">
                        {lastmassage}
                      </p>
                      .<span className="text-xs  self-center">{date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Massage Component */}
        <div className="flex-1">
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

            <div className=" flex-1 w-full sbar mx-auto overflow-y-auto ">
              <div className="flex p-4 flex-col gap-2 w-full items-start">
                {massage.map((data, index) => {
                  const { massage, self, date } = data;
                  return (
                    <div
                      key={index}
                      className={`flex w-full  ${
                        self ? "justify-end" : "text-left"
                      }`}
                    >
                      <div
                        className={`flex gap-2 ${self && "flex-row-reverse"}`}
                      >
                        {!self && (
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
                          className={`rounded-3xl max-w-md  text-white py-1 px-2 ${
                            self ? "bg-blue-400" : "bg-gray-400"
                          }`}
                        >
                          {massage}
                        </div>
                        <div className="text-xs flex-shrink-0 text-gray-400 self-center">
                          . {date}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex w-full relative items-center mx-auto bg-gradient-to-r from-blue-400 to-blue-400 cursor-pointer  p-2 gap-2">
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

              <div className="ring-offset-1 ring-1 ring-white rounded-full  flex flex-1 items-center relative w-11/12  mx-auto my-2 ">
                <input
                  placeholder="Aa"
                  className="rounded-2xl pr-10 hover:bg-opacity-20  transition focus:outline-none duration-200  bg-gray-500 bg-opacity-10 text-sm placeholder-gray-50 pl-4 backdrop-blur-sm text-gray-50 w-full h-10"
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
              <div className="p-2 rounded-full">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
