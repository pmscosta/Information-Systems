import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddSaftButton from "./AddSaftButton";
import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import "./NavBar.css";

const navBarStyle = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  appbar: {
    position: "fixed",
    marginBottom: theme.spacing(16)
  }
}));

const onLogout = () => {
  localStorage.setItem("loggedIn", false);
  window.location.reload();
};

function NavBar() {
  const styles = navBarStyle();

  return (
    <AppBar id="appbar" color="primary">
      <Toolbar className={styles.toolbar}>
        <Typography href="/" className="title">
          Sinfonia
        </Typography>
        <AddSaftButton />
        <IconButton
          color="secondary"
          className="logout"
          component="span"
          onClick={onLogout}
        >
          <PowerSettingsNewIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
