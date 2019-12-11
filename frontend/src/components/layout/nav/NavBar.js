import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddSaftButton from "./AddSaftButton";

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
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
