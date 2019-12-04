import React from "react";
import {
    LocationCity as InstitutionIcon,
    Person as PersonIcon,
    Group as InteractionIcon,
} from "@material-ui/icons";
import Overview from "../tab-pages/Overview";
import Finances from "../tab-pages/Finances";
import Purchases from "../tab-pages/Purchases";
import Sales from "../tab-pages/Sales";
import Inventory from "../tab-pages/Inventory";

const MainTabsConfig = () => [{
    label: "Overview",
    icon: InteractionIcon,
    component: <Overview/>,
},
{
    label: "Finances",
    icon: InstitutionIcon,
    component: <Finances />,
},
{
    label: "Purchases",
    icon: PersonIcon,
    component: <Purchases />,
},
{
    label: "Sales",
    icon: PersonIcon,
    component: <Sales />,
},
{
    label: "Inventory",
    icon: PersonIcon,
    component: <Inventory />,
}];


export default MainTabsConfig;
