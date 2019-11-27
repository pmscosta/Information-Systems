import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// route components
import Purchases from './pages/purchases';
import Homepage from './pages/Homepage'


import "./App.css";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:6200";
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/purchases" exact component={Purchases} />
          <Route path="/" exact component={Homepage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
