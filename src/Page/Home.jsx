import React, { useState } from "react";
import Intro from "../Components/Intro";
import ChatMessages from "../Components/message/ChatMessages";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  const [active, setActive] = useState(0);
  const [fetchingMessages, setFetchingMessages] = useState(true);

  const [toggle, setToggle] = useState(false);

  return (
    <div className="h-screen">
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
              setToggle={setToggle}
              toggle={toggle}
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
