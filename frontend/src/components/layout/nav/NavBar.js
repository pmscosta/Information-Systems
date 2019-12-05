import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
        display: 'none',
    },
}));


function NavBar() {
    const styles = navBarStyle();

    return (
        <AppBar className={styles.appbar} color="primary">
            <Toolbar className={styles.toolbar} >
                <Typography variant="h6" href="/" style={{
                    fontFamily: 'Pacifico',
                    fontSize: '2em',
                    margin: "0.5em",
                }}>
                    Sinfonia
                </Typography>

                <input
                    accept="image/*"
                    className={styles.input}
                    id="text-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="text-button-file">
                    <Button
                        variant="outlined"
                        color="inherit"
                        className={styles.button}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload SAF-T
                    </Button>
                </label>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;