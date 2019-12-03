import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// route components
import Purchases from "./pages/purchases";
import Stock from "./pages/stock";
import Sales from "./pages/sales";
import "./App.css";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:6002";
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/purchases" exact component={Purchases} />
          <Route path="/stock" exact component={Stock} />
          <Route path="/sales" exact component={Sales} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
