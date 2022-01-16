import React from "react";
import { useState, useRef } from "react";
import axiosInstance from "../API/AxiosInstance";
import { useEffect } from "react";
import Intro from "../Components/Intro";
import moment from "moment";
import Messanger from "./Messanger";
import Search from "../assets/icon/Search";
import Cross from "../assets/icon/Cross";
import Camera from "../assets/icon/Camera";
import CameraPop from "../Components/CameraPop";
import Sidebar from "../Components/Sidebar";
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
        <CameraPop
          Back={Back}
          ClickPhoto={ClickPhoto}
          video={video}
          canvas={canvas}
        />
      )}

      <section className="flex h-full ">
        <Sidebar
          setActive={setActive}
          userList={userList}
          searchload={searchload}
          getUserList={getUserList}
          setsearch={setsearch}
          Cross={Cross}
          search={search}
          Search={Search}
          searchinput={searchinput}
          setsearchinput={setsearchinput}
          active={active}
          toggle={toggle}
          Handelsearchsubmit={Handelsearchsubmit}
        />
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
