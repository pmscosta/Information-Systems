import { inventoryTypes } from "../actions/inventoryActions";

const initialState = {
  loading: false,
  inventory: [],
  inventoryBalance: 0,
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
        const val = item.warehouses
          .reduce((acc, b) => acc + b.stockBalance, 0)
          .toFixed(2);
        item.stockBalance = val;
      });
      return {
        ...state,
        inventory: _inventory,
        inventoryBalance: _inventory.reduce(
          (acc, b) =>
            acc + b.warehouses.reduce((i, j) => i + j.balanceAmount, 0),
          0
        )
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
