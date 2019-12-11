export const salesTypes = Object.freeze({
  SET_SALES_LOADING: "sales/set-loading",
  SET_SALES: "sales/set-data",
  SET_SALES_ERROR: "sales/set-error"
});

export const setSalesLoading = loading => ({
  type: salesTypes.SET_SALES_LOADING,
  payload: loading
});

export const setSalesData = data => ({
  type: salesTypes.SET_SALES,
  payload: data
});

export const setSalesError = error => ({
  type: salesTypes.SET_SALES_ERROR,
  payload: error
});
