import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Page/Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
