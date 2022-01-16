import React, { useState, useRef } from "react";
import Intro from "../Components/Intro";
import ChatMessages from "../Components/message/ChatMessages";
import CameraPop from "../Components/CameraPop";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  const video = useRef();
  const canvas = useRef();
  const canvasa = useRef();
  const imgfile = useRef();

  const [active, setActive] = useState(0);
  const [fetchingMessages, setFetchingMessages] = useState(true);

  const [localstream, setlocalstream] = useState("");
  const [imagepath, setimagepath] = useState("");
  const [file, setfile] = useState("");

  const [toggle, setToggle] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [camera, setcamera] = useState(false);

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

      <section className="flex h-full">
        <Sidebar
          handleChange={(user) => {
            setActive(user);
            setFetchingMessages(true);
          }}
          active={active}
          toggle={toggle}
        />
        {/* Massage Component */}
        {active ? (
          <div className="flex-1">
            <ChatMessages
              active={active}
              imgfile={imgfile}
              setlocalstream={setlocalstream}
              video={video}
              setcamera={setcamera}
              imagepath={imagepath}
              canvasa={canvasa}
              file={file}
              setfile={setfile}
              setimagepath={setimagepath}
              setToggle={setToggle}
              toggle={toggle}
              showPicker={showPicker}
              setShowPicker={setShowPicker}
              fetchingMessages={fetchingMessages}
              setFetchingMessages={setFetchingMessages}
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
