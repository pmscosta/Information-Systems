import { combineReducers } from "redux";
import purchasesReducer from "./purchasesReducer";
import inventoryReducer from "./inventoryReducer";

export default combineReducers({
  purchases: purchasesReducer,
  inventory: inventoryReducer
});
