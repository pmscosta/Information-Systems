export const salesTypes = Object.freeze({
  SET_SALES_LOADING: "sales/set-loading",
  SET_TOP_CLIENTS: "sales/set-top-clients",
  SET_CLIENTS: "sales/set-clients",
  SET_INVOICES: "sales/set-invoices",
  SET_TOTAL_SALES: "sales/set-total-sales",
  SET_TOP_SOLD_PRODUCTS: "sales/set-top-sold-products",
  SET_SALES_PER_MONTH: "sales/set-sales-per-month",
  SET_SALES_ERROR: "sales/set-error"
});

export const setSalesLoading = loading => ({
  type: salesTypes.SET_SALES_LOADING,
  payload: loading
});

export const setSalesTopClients = data => ({
  type: salesTypes.SET_TOP_CLIENTS,
  payload: data
});

export const setSalesClients = data => ({
  type: salesTypes.SET_CLIENTS,
  payload: data
});

export const setSalesInvoices = data => ({
  type: salesTypes.SET_INVOICES,
  payload: data
});

export const setSalesTotal = data => ({
  type: salesTypes.SET_TOTAL_SALES,
  payload: data
});

export const setSalesTopSoldProducts = data => ({
  type: salesTypes.SET_TOP_SOLD_PRODUCTS,
  payload: data
});

export const setSalesPerMonth = data => ({
  type: salesTypes.SET_SALES_PER_MONTH,
  payload: data
});

export const setSalesError = error => ({
  type: salesTypes.SET_SALES_ERROR,
  payload: error
});
