import React from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const navBarStyle = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  appbar: {
    position: "fixed",
    marginBottom: theme.spacing(16),
    color: "--light-color"
  },
  input: {
    display: "none"
  }
}));

const handleUploadFile = event => {
  const data = new FormData();
  data.append("xmlFile", event.target.files[0]);

  axios
    .post("/api/saft", data)
    .then(response => {
      console.log(response); // do something with the response
    })
    .catch(err => console.log(err));
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

        <input
          className={styles.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleUploadFile}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload SAF-T
          </Button>
        </label>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
