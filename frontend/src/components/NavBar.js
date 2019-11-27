import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const navBarStyle = makeStyles(theme => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
    appbar: {
        position: "fixed",
        marginBottom: theme.spacing(16)
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));


function NavBar() {
    const styles = navBarStyle();

    return (
        <AppBar className={styles.appbar}>
            <Toolbar className={styles.toolbar} >
                <Typography variant="h6" href="/">
                    SINFonia
                </Typography>
                <Button href="/finances" className={styles.button}>
                    Finances
                </Button>
                <Button href="/purchases" className={styles.button}>
                    Purchases
                </Button>
                <Button href="/sales" className={styles.button}>
                    Sales
                </Button>
                <Button href="/inventory" className={styles.button}>
                    Inventory
                </Button>
                <input
                    accept="image/*"
                    className={styles.input}
                    id="text-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="text-button-file">
                    <Button component="span" className={styles.button}>
                        Upload SAF-T
                    </Button>
                </label>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;