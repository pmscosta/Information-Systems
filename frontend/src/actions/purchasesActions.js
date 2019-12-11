export const purchasesTypes = Object.freeze({
  SET_PURCHASES_LOADING: "purchases/set-loading",
  SET_PURCHASES: "purchases/set-data",
  SET_PURCHASES_ERROR: "purchases/set-error"
});

export const setPurchasesLoading = loading => ({
  type: purchasesTypes.SET_PURCHASES_LOADING,
  payload: loading
});

export const setPurchasesData = data => ({
  type: purchasesTypes.SET_PURCHASES,
  payload: data
});

export const setPurchasesError = error => ({
  type: purchasesTypes.SET_PURCHASES_ERROR,
  payload: error
});
