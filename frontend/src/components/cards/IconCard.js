import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
    card: {
        minWidth: 275
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 25,
        fontFamily: "Bebas Neue"
    },
    pos: {
        fontSize: 40,
        marginBottom: 12,
        fontFamily: "Bebas Neue"
    }
});

const IconCard = props => {
    const classes = useStyles();

    return (
        <Box borderTop={5} borderColor={props.outline} m={2} styles={{ display: "inline-block", backgroundColor: "#E7DFDD", color: "#0E0B16", margin: "2em" }}>
            <Card
                className={classes.card}
                style={{ display: "inline-block", backgroundColor: "#E7DFDD", color: "#0E0B16" }}

            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"

                >
                    <Grid item><props.icon fontSize="large" color={props.color} style={{ margin: "0.2em" }} /></Grid>
                    <Grid item>
                        <Typography className={classes.title}>
                            {props.name}
                        </Typography>
                    </Grid>

                </Grid>

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"

                >
                    <Grid item>
                        <Typography className={classes.pos}>{props.value}  </Typography>
                    </Grid>
                    <Grid item><EuroSymbolIcon fontSize="small" /></Grid>
                </Grid>
            </Card>
        </Box>
    );
};

export default IconCard;
