export const inventoryTypes = Object.freeze({
  SET_INVENTORY_LOADING: "inventory/set-loading",
  SET_INVENTORY: "inventory/set-data",
  SET_INVENTORY_ERROR: "inventory/set-error"
});

export const setInventoryLoading = loading => ({
  type: inventoryTypes.SET_INVENTORY_LOADING,
  payload: loading
});

export const setInventoryData = data => ({
  type: inventoryTypes.SET_INVENTORY,
  payload: data
});

export const setInventoryError = error => ({
  type: inventoryTypes.SET_INVENTORY_ERROR,
  payload: error
});
