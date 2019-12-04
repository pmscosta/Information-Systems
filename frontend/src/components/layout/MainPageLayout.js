import React from "react";
import PropTypes from "prop-types";
import NavBar from './nav/NavBar';

const MainPageLayout = ({ children }) => (
    <>
        <NavBar />
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
