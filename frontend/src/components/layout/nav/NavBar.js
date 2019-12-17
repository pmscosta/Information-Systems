import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddSaftButton from "./AddSaftButton";
import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const navBarStyle = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  appbar: {
    position: "fixed",
    marginBottom: theme.spacing(16),
    color: "--light-color"
  }
}));

const onLogout = () => {
  localStorage.setItem("loggedIn", false);
  window.location.reload();
};

function NavBar() {
  const styles = navBarStyle();

  return (
    <AppBar className={styles.appbar} color="primary">
      <Toolbar className={styles.toolbar}>
        <Typography
          variant="h6"
          href="/"
          style={{
            fontFamily: "Pacifico",
            fontSize: "2.2em",
            margin: "0.1em",
            color: "#E7DFDD"
          }}
        >
          Sinfonia
        </Typography>
        <AddSaftButton />
        <IconButton color="secondary" component="span" onClick={onLogout}>
          <PowerSettingsNewIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
