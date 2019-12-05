import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import "./style/common.css";
import theme from "./theme";
import MainPage from "./pages/main-page/MainPage";


if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:6200";
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/:view" component={MainPage} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
