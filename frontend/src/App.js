import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
// route components
// import Overview from './pages/Overview';
// import Finances from './pages/Finances';
// import Purchases from './pages/Purchases';
// import Sales from './pages/Sales';
// import Inventory from './pages/Inventory';
// style
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
            {/* <Redirect exact from="/" to="/overview" /> */}
            <Route path="/" exact component={MainPage} />
            {/* <Route path="/finances" exact component={Finances} />
            <Route path="/purchases" exact component={Purchases} />
            <Route path="/sales" exact component={Sales} />
            <Route path="/inventory" exact component={Inventory} /> */}
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
