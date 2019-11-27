import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
// route components
import Purchases from './pages/purchases';
import Homepage from './pages/Homepage';
// style
import "./style/common.css";
import theme from "./theme";


if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:6200";
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/purchases" exact component={Purchases} />
            <Route path="/" exact component={Homepage} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
