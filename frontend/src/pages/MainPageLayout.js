import React from "react";
import PropTypes from "prop-types";
import NavBar from '../components/Nav/NavBar';
import FullWidthTabs from "../components/Tab/FullWidthTabs";

const MainPageLayout = ({ children }) => (
    <>
        <NavBar />
        <br/><br/><br/><br/>
        <FullWidthTabs/>
        <br/><br/>
        {children}

    </>
);

MainPageLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default MainPageLayout;
