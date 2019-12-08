export const jasminTypes = Object.freeze({
  SET_PURCHASES_LOADING: "jasmin/set-purchases-loading",
  SET_PURCHASES: "jasmin/set-purchases",
  SET_INVENTORY_LOADING: "jasmin/set-purchases-loading",
  SET_INVENTORY: "jasmin/set-purchases",
  SET_ERROR: "jasmin/set-error"
});

export const setPurchasesLoading = loading => ({
  type: jasminTypes.SET_PURCHASES_LOADING,
  payload: loading
});

export const setPurchasesData = data => ({
  type: jasminTypes.SET_PURCHASES,
  payload: data
});

export const setInventoryLoading = loading => ({
  type: jasminTypes.SET_INVENTORY_LOADING,
  payload: loading
});

export const setInventoryData = data => ({
  type: jasminTypes.SET_INVENTORY,
  payload: data
});

export const setJasminError = error => ({
  type: jasminTypes.SET_ERROR,
  payload: error
});
