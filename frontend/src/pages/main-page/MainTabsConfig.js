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
    label: "overview",
    icon: EqualizerSharp,
    component: Overview ,
    to: "/overview",
},
{
    label: "finances",
    icon: EuroSharp,
    component: Finances,
    to: "/finances",
},
{
    label: "purchases",
    icon: ShoppingCartSharp,
    component: Purchases ,
    to: "/purchases",
},
{
    label: "sales",
    icon: LocalOfferSharp,
    component: Sales,
    to: "/sales",
},
{
    label: "inventory",
    icon: StorefrontSharp,
    component: Inventory,
    to: "/inventory",
}];


export default MainTabsConfig;
