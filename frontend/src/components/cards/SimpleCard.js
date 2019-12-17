import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StyledLink from "../../components/StyledLink";
import Grid from "@material-ui/core/Grid";
import EuroIcon from "@material-ui/icons/Euro";

const useStyles = makeStyles({
  card: {
    width: 275,
    margin: 30,
    borderRadius: 20,
    border: "10px",
    borderColor: "red",
    fontFamily: "Roboto"
  },
  title: {
    fontSize: 18,
    fontWeight: "fontWeightBold"
  },
  number: {
    fontSize: 30,
    marginRight: "2px",
    alignSelf: "baseline"
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

const SimpleCard = ({ label, number, to, unit }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <StyledLink to={to}>
        <CardContent className={classes.content}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {label}
          </Typography>
          <Typography
            align="left"
            color="primary"
            gutterBottom
            className={classes.number}
          >
            {number} {unit ? unit : <EuroIcon color="primary" />}
          </Typography>
        </CardContent>
      </StyledLink>
    </Card>
  );
};

export default SimpleCard;
