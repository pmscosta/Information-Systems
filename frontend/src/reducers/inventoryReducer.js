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
      const _inventory = action.payload;
      _inventory.forEach(item => {
        const val = item.warehouses.reduce((acc, b) => acc + b.stockBalance, 0);
        item.stockBalance = val;
      });
      return {
        ...state,
        inventory: _inventory
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
