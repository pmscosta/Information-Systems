import React from "react";
import { useSelector } from "react-redux";
import AppLinearProgress from "../../components/AppLinearProgress";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import update from "immutability-helper";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import SimpleCard from "../../components/cards/SimpleCard";
import "./Inventory.css";
import "../../style/common.css";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: "20em",
    maxWidth: "20em",
    minHeight: "fit-content",
    maxHeight: "fit-content"
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  danger: {
    fontFamily: "Raleway",
    color: "red",
    fontWeight: 400
  },
  normal: {
    fontFamily: "Raleway",
    fontWeight: 400
  },
  title: {
    fontFamily: "Raleway",
    fontSize: 22,
    fontWeight: 600
  }
}));

const Inventory = () => {
  const classes = useStyles();
  const { loading, inventory, inventoryBalance } = useSelector(
    state => state.inventory
  );

  const [open, setOpen] = React.useState(
    inventory.reduce((acc, i) => {
      acc[i.itemKey] = false;
      return acc;
    }, {})
  );
  const handleClick = key => {
    const prev = open[key];
    const temp = update(open, { [key]: { $set: !prev } });
    setOpen(temp);
  };

  const drawItemList = (title, items, doDropdown) => {
    return (
      <Card
        className={classes.card}
        style={{ display: "inline-block", margin: "2em" }}
        variant="outline"
      >
        <CardContent>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                className={classes.title}
                component="div"
                id="nested-list-subheader"
              >
                {title}
              </ListSubheader>
            }
            className={classes.root}
          >
            {items.map(item => {
              return (
                <React.Fragment key={item.itemKey}>
                  <ListItem
                    button
                    onClick={() => {
                      if (doDropdown) handleClick(item.itemKey);
                    }}
                  >
                    <ListItemText
                      primary={item.itemKey}
                      className={
                        item.stockBalance <= (item.minStock || 0)
                          ? classes.danger
                          : classes.normal
                      }
                      secondary={`Total Stock Balance: ${item.stockBalance}`}
                    />
                    {doDropdown ? (
                      open[item.itemKey] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null}
                  </ListItem>
                  {doDropdown && (
                    <Collapse
                      in={open[item.itemKey]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.warehouses.map((wh, i) => {
                          return (
                            <React.Fragment key={`${item.itemKey}${i}`}>
                              <ListItem button className={classes.nested}>
                                <ListItemText
                                  primary={`Warehouse ${i}:  ${wh.stockBalance}`}
                                />
                                <ListItemIcon>
                                  <HomeWorkIcon />
                                </ListItemIcon>
                              </ListItem>
                            </React.Fragment>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      {loading && (
        <>
          <br /> <AppLinearProgress />
        </>
      )}
      <Container id="inventory-page">
        <SimpleCard label="INVENTORY BALANCE" number={`${inventoryBalance}`} />
        <div id="inventory-lists">
          {drawItemList(
            "STOCK BREAKDOWN",
            inventory.filter(({ stockBalance }) => {
              return stockBalance <= 0;
            }),
            true
          )}
          {drawItemList("STOCK LIST", inventory, false)}
        </div>
      </Container>
    </>
  );
};

export default Inventory;
