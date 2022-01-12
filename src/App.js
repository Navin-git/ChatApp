import "./App.css";
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Page/Home";
import Register from "./Page/Register";
import Signin from "./Page/Signin";
import jwtDecode from "jwt-decode";
import socketIoClient from "socket.io-client";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import axiosInstance from "./API/AxiosInstance";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const socket = socketIoClient("");

function App() {
  const [validityCheck, setValidityCheck] = useState(false);
  const [valid, setValid] = useState(false);
  useEffect(() => {
    {
      axiosInstance
        .post(`user/verify-jwt/`)
        .then((res) => {
          console.log(res);
          setValid(true);
          setValidityCheck(true);
        })
        .catch((err) => {
          console.log(err);
          setValid(false);
          setValidityCheck(true);
        });
    }
  }, []);
  console.log(valid);
  const token = localStorage.getItem("token");
  const [decoded, setdecoded] = useState({});
  useEffect(() => {
    if (token) {
      try {
        setdecoded(jwtDecode(token));
      } catch (e) {
        localStorage.clear();
      }
    }
  }, []);

  console.log("decode", decoded);

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
    console.log(comp);
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
