import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import PropTypes from "prop-types";
import { Switch, Route, Link } from "react-router-dom";
import "../../../style/common.css";

const TabLabels = (options) =>
    options.map((option, i) =>
        <Tab label={option.label} key={option.label + i} icon={<option.icon />}>
            {/* <Link to={'/'+option.to}/> */}
        </Tab>
    );

const TabPanels = (options, state) =>
    options.map((option, i) =>
        <TabPanel value={state} key={option.label + i} index={i}>
            <option.component/>
            {/* <Route path={'/'+option.to} component={option.component}/> */}
        </TabPanel>
    );


const TabsLayout = ({ options }) => {
    const [value, setValue] = useState(0);
    const labels = TabLabels(options);
    const panels = TabPanels(options, value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="secondary"
                variant="fullWidth"
                centered
                //style={{backgroundColor: "#E7DFDD"}}
            >
                {labels}
            </Tabs>
            {panels}
        </div>
    );
};

TabsLayout.propTypes = {
    options: PropTypes.array.isRequired,
};

export default TabsLayout;
