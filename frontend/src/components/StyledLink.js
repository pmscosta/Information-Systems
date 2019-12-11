import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const style = {
  link: {
    textDecoration: "none",
    color: "inherit"
  }
};

class StyledLink extends React.Component {
  render() {
    const { classes, children, to } = this.props;

    return (
      <Link to={to} className={classes.link}>
        {children}
      </Link>
    );
  }
}

StyledLink.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired
};

export default withStyles(style)(StyledLink);
