import { jasminTypes } from "../actions/jasminActions";

const initialState = {
  purchasesLoading: false,
  inventoryLoading: false,
  purchases: [],
  inventory: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case jasminTypes.SET_PURCHASES_LOADING:
      return {
        ...state,
        purchasesLoading: action.payload
      };
    case jasminTypes.SET_INVENTORY_LOADING:
      return {
        ...state,
        inventoryLoading: action.payload
      };
    case jasminTypes.SET_PURCHASES:
      return {
        ...state,
        purchases: action.payload
      };
    case jasminTypes.SET_INVENTORY:
      return {
        ...state,
        purchases: action.payload
      };
    case jasminTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
