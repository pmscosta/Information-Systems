import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { maxHeight } from "@material-ui/system";

const useStyles = makeStyles({
  card: {
    minWidth: "fit-content",
    maxHeight: "7em"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  },
  value: {
    fontSize: 28,
    fontWeight: "bolder",
    paddingLeft: "1em",
    marginTop: 10
  },
  pos: {
    marginBottom: 12
  }
});

const SimpleValueCard = props => {
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      style={{ display: "inline-block", margin: "2em" }}
      variant="outline"
    >
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {props.name}
        </Typography>
        <Typography className={classes.value}>{props.value}</Typography>
      </CardContent>
    </Card>
  );
};

export default SimpleValueCard;
