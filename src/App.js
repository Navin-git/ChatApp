import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Page/Home";
import Register from "./Page/Register";
import Signin from "./Page/Signin";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/signin" render={() => <Signin />} />
      </Switch>
    </div>
  );
}

export default App;
