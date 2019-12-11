import { combineReducers } from "redux";
import purchasesReducer from "./purchasesReducer";
import inventoryReducer from "./inventoryReducer";
import salesReducer from "./salesReducer";

export default combineReducers({
  purchases: purchasesReducer,
  inventory: inventoryReducer,
  sales: salesReducer
});
