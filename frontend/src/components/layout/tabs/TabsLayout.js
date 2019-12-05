import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import PropTypes from "prop-types";
import "../../../style/common.css";
import { Switch, Route, Link } from "react-router-dom";

const TabLabels = options =>
  options.map((option, i) => (
    <Tab
      label={option.label}
      icon={<option.icon />}
      key={option.label}
      value={option.label}
      to={option.to}
      component={Link}
    />
  ));

const TabPanels = options => {
  return options.map((option, i) => (
    <Route path={`${option.to}`} key={option.label}>
      <TabPanel
        value={`${options.label}`}
        index={i}
        component={option.component}
      />
    </Route>
  ));
};

const TabsLayout = ({ options, value }) => {
  const labels = TabLabels(options);
  const panels = TabPanels(options);

  return (
    <div>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="secondary"
        variant="fullWidth"
        centered
      >
        {labels}
      </Tabs>
      <Switch>{panels}</Switch>
    </div>
  );
};

TabsLayout.propTypes = {
  options: PropTypes.array.isRequired
};

export default TabsLayout;
