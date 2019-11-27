import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 40,
  },
  pos: {
    marginBottom: 12,
  },
});

const ValueCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} style={{display: 'inline-block', margin: '2em'}} variant="outline">
      <CardContent>
        <Typography className={classes.title} gutterBottom >
          {props.value}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.name}
        </Typography>

      </CardContent>
      <CardActions>
        <Button align="right" size="small">View {props.name} Details </Button>
      </CardActions>
    </Card>
  );
}

export default ValueCard;