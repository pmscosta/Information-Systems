import React from "react";
import PropTypes from "prop-types";
import NavBar from "./nav/NavBar";
import Toolbar from "@material-ui/core/Toolbar";

const MainPageLayout = ({ children }) => (
  <>
    <Toolbar>
      <NavBar />
    </Toolbar>
    {children}
  </>
);

MainPageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default MainPageLayout;
