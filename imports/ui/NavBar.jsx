import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useNavBarStyle = makeStyles(theme => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
    appbar: {
        position: "fixed",
        marginBottom: theme.spacing(16)
    }
}));

function NavBar() {
    const styles = useNavBarStyle();

    return (
        <AppBar className={styles.appbar}>
            <Toolbar className={styles.toolbar} >
                <Typography variant="h6" href="/">
                    SINFonia
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;