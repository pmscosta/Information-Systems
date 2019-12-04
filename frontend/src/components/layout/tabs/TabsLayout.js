import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import PropTypes from "prop-types";

const TabLabels = (options) =>
    options.map((option, i) =>
        <Tab label={option.label} key={option.label + i} icon={<option.icon />} />
    );

const TabPanels = (options, state) =>
    options.map((option, i) =>
        <TabPanel value={state} key={option.label + i} index={i}>
            {option.component}
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
                textColor="primary"
                variant="fullWidth"
                centered
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
