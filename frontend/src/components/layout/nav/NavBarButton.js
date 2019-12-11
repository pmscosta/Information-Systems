import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const navBarStyle = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const NavbarButton = () => {
  const styles = navBarStyle();

  return (
    <Button href="/finances" className={styles.button}>
      Finances
    </Button>
  );
};

export default NavbarButton;
