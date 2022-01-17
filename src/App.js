import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";
import io from "socket.io-client";
import Home from "./Page/Home";
import Register from "./Page/Register";
import Signin from "./Page/Signin";
import axiosInstance from "./API/AxiosInstance";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const socket = io("http://127.0.0.1:8000", {
  transports: ["websocket", "polling"],
});

function App() {
  const [validityCheck, setValidityCheck] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    axiosInstance
      .post(`user/verify-jwt/`)
      .then((res) => {
        setValid(true);
        setValidityCheck(true);
      })
      .catch((err) => {
        setValid(false);
        setValidityCheck(true);
      });
  }, []);

  const HandelCheck = () => {
    return valid ? (
      validityCheck ? (
        <Home />
      ) : (
        <div>Loading</div>
      )
    ) : !valid && validityCheck ? (
      <Redirect to="/register" />
    ) : (
      <div>Loading</div>
    );
  };

  const HandelCheckAuth = (comp) => {
    return valid ? (
      validityCheck ? (
        <Redirect to="/" />
      ) : (
        <div>Loading</div>
      )
    ) : validityCheck ? (
      comp
    ) : (
      <div>Loading</div>
    );
  };

  useEffect(() => {
    if (valid) {
      const token = localStorage.getItem("token");
      socket.emit("join", { token }, (err) => {
        if (err) {
          const { status } = err;
          if (status === 401) {
            localStorage.removeItem("token");
            window.location = "/signin";
          }
        }
      });

      socket.on("receiveMessage", (data) => {
        console.log(data);
      });
    }
  }, [valid]);

  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={HandelCheck} />
        <Route
          exact
          path="/register"
          component={() => HandelCheckAuth(<Register />)}
        />
        <Route
          exact
          path="/signin"
          component={() => HandelCheckAuth(<Signin />)}
        />
      </Switch>
    </div>
  );
}

export default App;
