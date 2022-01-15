import React from "react";
import { useState, useRef } from "react";
import axiosInstance from "../API/AxiosInstance";
import { useEffect } from "react";
import Intro from "../Components/Intro";
import moment from "moment";
import Messanger from "./Messanger";
const Home = () => {
  const video = useRef();
  const canvas = useRef();
  const canvasa = useRef();
  const imgfile = useRef();
  const messagediv = useRef();

  const [searchinput, setsearchinput] = useState("");
  const [search, setsearch] = useState(false);
  const [searchload, setsearchload] = useState(false);
  const [loadMessage, setLoadMessage] = useState(false);

  const [userList, setuserList] = useState([]);

  const [massagedata, setmassagedata] = useState([]);
  const [massagedatas, setmassagedatas] = useState([]);

  const [active, setActive] = useState(0);
  const [messagepage, setmessagepage] = useState(1);

  const [camera, setcamera] = useState(false);
  const [localstream, setlocalstream] = useState("");
  const [imagepath, setimagepath] = useState("");
  const [file, setfile] = useState("");

  // console.log("camera", camera, "localstream", localstream);

  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    // setShowPicker(false);
  };
  // console.log(massagedata);
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
    // console.log(video);
    let ctx = canvass.getContext("2d");
    ctx.drawImage(video.current, 0, 0, canvass.width, canvass.height);
    let canvassa = canvasa.current;
    // console.log(canvasa);
    let ctxa = canvassa.getContext("2d");
    ctxa.drawImage(video.current, 0, 0, canvassa.width, canvassa.height);
    let image_data_url = canvass.toDataURL("image/jpeg");
    setimagepath(image_data_url);
    // console.log("me", image_data_url);
  };
  const Getmessage = () => {
    axiosInstance
      .post(`chat/`, { user: active })
      .then((res) => {
        // console.log(res);
        setmassagedata(res.data.data);
        setmassagedatas(res.data.data.messages);
        res.data.data.nextPage && setmessagepage(messagepage + 1);
        // console.log("me", messagediv.current.scrollHeight);
        messagediv.current.scrollTo(0, messagediv.current.scrollHeight);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const HandelMessageSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/chat/send", { receiver: active, message: inputStr })
      .then((res) => {
        setInputStr("");
        Getmessage();
      });
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
  const Handelsearchsubmit = (e) => {
    e.preventDefault();
    setsearch(true);
    setsearchload(true);
    axiosInstance
      .get(`user/search?user=${searchinput}&page=${1}`)
      .then((res) => {
        // console.log(res.data.data.users);
        setuserList(res.data.data.users);
        setsearchload(false);
      })
      .catch((err) => {
        console.log(err);
        setsearchload(false);
      });
  };

  useEffect(() => {
    if (active) {
      Getmessage();
    }
  }, [active]);
  const getUserList = () => {
    setsearchload(true);
    axiosInstance.post("chat/users").then((res) => {
      // console.log("hi", res.data.data);
      setsearchload(false);
      setuserList(res.data.data.users);
    });
  };
  useEffect(() => {
    getUserList();
  }, []);
  const getscrollmessage = () => {
    axiosInstance
      .post(`chat?page=${messagepage}`, { user: active })
      .then((res) => {
        // console.log(res);
        var data = massagedata;

        // setmassagedata((old) => {
        //   return [...old, ...res.data.data.messages];
        // });
        console.log("naya data", massagedata);
        setmassagedatas([...massagedatas, ...res.data.data.messages]);
        setLoadMessage(false);
        res.data.data.nextPage && setmessagepage(messagepage + 1);
      })
      .catch((err) => {
        console.log(err);
        setLoadMessage(false);
      });
  };
  const HandelScroll = (event) => {
    if (
      messagediv.current.scrollTop === 0 &&
      massagedata.nextPage &&
      !loadMessage
    ) {
      setLoadMessage(true);
      getscrollmessage();
    }
    // if (event.nativeEvent.contentOffset.y === 0 && massagedata.nextPage) {
    //   Getmessage();
    // }
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
          className={`sm:border-r fixed  sm:w-72 h-screen flex-shrink-0 overflow-hidden sm:static z-10 flex flex-col shadow-lg  bg-gradient-to-r from-blue-500 to-blue-400 border-gray-100 ${
            !active ? "w-full" : toggle ? "w-72" : "w-0"
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
            <form
              onSubmit={Handelsearchsubmit}
              className="ring-offset-1 ring-1 ring-white rounded-full  flex flex-1 items-center relative w-11/12  mx-auto my-2 "
            >
              <input
                name="searchinput"
                required
                value={searchinput}
                disabled={search ? true : false}
                onChange={(e) => {
                  setsearchinput(e.target.value);
                }}
                placeholder="enter your keyboard"
                className="rounded-2xl pr-10 hover:bg-opacity-20  transition focus:outline-none duration-200  bg-gray-500 bg-opacity-10 text-sm placeholder-gray-50 pl-4 backdrop-blur-sm text-gray-50 w-full h-10"
              />
              {/* <SearchIcon className="absolute right-4 text-gray-50" /> */}
              <div className=" absolute right-4 text-gray-50">
                {search ? (
                  <svg
                    onClick={() => {
                      setsearch(false);
                      getUserList();
                      setsearchinput("");
                    }}
                    className="w-6 cursor-pointer text-white h-6"
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
                ) : (
                  <button>
                    <svg
                      className="w-6 h-6  text-gray-50"
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
                  </button>
                )}
              </div>
            </form>
          </div>

          <br />
          {/* User List */}
          <div
            style={{ width: "95%" }}
            className=" flex-1 sbar mx-auto overflow-y-auto "
          >
            {!searchload &&
              userList.map((data, index) => {
                const { username, _id, lastMessage } = data;
                console.log(username);
                return (
                  <div
                    onClick={() => {
                      setActive(_id);
                    }}
                    key={index}
                    className={`flex my-1 rounded-lg flex-shrink-0 mr-2 hover:mr-0 focus:bg-blue-600 hover:bg-blue-600 cursor-pointer  p-2 gap-2 ${
                      active === _id ? "bg-blue-600" : ""
                    }`}
                  >
                    <div className="relative w-12 h-12">
                      <img
                        className="rounded-full border border-gray-100 shadow-sm"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="username image"
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
                              moment(lastMessage.time).format(
                                "ddd MMM DD YYYY"
                              )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

            {searchload && (
              <div className="text-white font-medium">Loading . . .</div>
            )}
            {!searchload && search && userList.length === 0 && (
              <div className="text-white font-medium">User Not found</div>
            )}
          </div>
        </div>
        {/* Massage Component */}
        {active ? (
          <div className="flex-1">
            <Messanger
              imgfile={imgfile}
              setlocalstream={setlocalstream}
              video={video}
              setcamera={setcamera}
              imagepath={imagepath}
              canvasa={canvasa}
              file={file}
              imagepath={imagepath}
              setfile={setfile}
              setimagepath={setimagepath}
              HandelMessageSubmit={HandelMessageSubmit}
              loadMessage={loadMessage}
              massagedatas={massagedatas}
              setToggle={setToggle}
              toggle={toggle}
              messagediv={messagediv}
              HandelScroll={HandelScroll}
              setInputStr={setInputStr}
              showPicker={showPicker}
              setShowPicker={setShowPicker}
              inputStr={inputStr}
              onEmojiClick={onEmojiClick}
              getscrollmessage={getscrollmessage}
              massagedata={massagedata}
            />
          </div>
        ) : (
          <Intro />
        )}
      </section>
    </div>
  );
};
export default Home;
