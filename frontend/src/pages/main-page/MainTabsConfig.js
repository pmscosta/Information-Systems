import React from "react";
import {
    ShoppingCartSharp,
    StorefrontSharp,
    EqualizerSharp,
    EuroSharp,
    LocalOfferSharp
} from "@material-ui/icons";
import Overview from "../tab-pages/Overview";
import Finances from "../tab-pages/Finances";
import Purchases from "../tab-pages/Purchases";
import Sales from "../tab-pages/Sales";
import Inventory from "../tab-pages/Inventory";

const MainTabsConfig = () => [{
    label: "Overview",
    icon: EqualizerSharp,
    component: Overview ,
},
{
    label: "Finances",
    icon: EuroSharp,
    component: Finances ,
},
{
    label: "Purchases",
    icon: ShoppingCartSharp,
    component: Purchases ,
},
{
    label: "Sales",
    icon: LocalOfferSharp,
    component: Sales ,
},
{
    label: "Inventory",
    icon: StorefrontSharp,
    component: Inventory ,
}];


export default MainTabsConfig;
