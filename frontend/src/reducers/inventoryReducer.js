import { inventoryTypes } from "../actions/inventoryActions";

const initialState = {
  loading: false,
  inventory: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case inventoryTypes.SET_INVENTORY_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case inventoryTypes.SET_INVENTORY:
      return {
        ...state,
        inventory: action.payload
      };
    case inventoryTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
