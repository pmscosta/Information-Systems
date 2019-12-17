export const cashflowTypes = Object.freeze({
  SET_CASHFLOW_LOADING: "cashflow/set-loading",
  SET_CASHFLOW: "cashflow/set-data",
  SET_CASHFLOW_ERROR: "cashflow/set-error"
});

export const setCashflowLoading = loading => ({
  type: cashflowTypes.SET_CASHFLOW_LOADING,
  payload: loading
});

export const setCashflowData = data => ({
  type: cashflowTypes.SET_CASHFLOW,
  payload: data
});

export const setCashflowError = error => ({
  type: cashflowTypes.SET_CASHFLOW_ERROR,
  payload: error
});
