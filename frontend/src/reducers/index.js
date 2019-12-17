import { combineReducers } from "redux";
import purchasesReducer from "./purchasesReducer";
import inventoryReducer from "./inventoryReducer";
import salesReducer from "./salesReducer";
import cashflowReducer from "./cashflowReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
  purchases: purchasesReducer,
  inventory: inventoryReducer,
  sales: salesReducer,
  cashflow: cashflowReducer,
  login: loginReducer
});
