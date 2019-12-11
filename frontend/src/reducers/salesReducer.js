import { salesTypes } from "../actions/salesActions";

const initialState = {
  loading: false,
  topClients: [],
  clients: [],
  invoices: [],
  totalSales: 0,
  topSoldProducts: [],
  salesPerMonth: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case salesTypes.SET_SALES_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case salesTypes.SET_TOP_CLIENTS:
      return {
        ...state,
        topClients: action.payload
      };
    case salesTypes.SET_CLIENTS:
      return {
        ...state,
        clients: action.payload
      };
    case salesTypes.SET_INVOICES:
      return {
        ...state,
        invoices: action.payload
      };
    case salesTypes.SET_TOTAL_SALES:
      return {
        ...state,
        totalSales: action.payload[0].TotalSalesValue
      };
    case salesTypes.SET_TOP_SOLD_PRODUCTS:
      return {
        ...state,
        topSoldProducts: action.payload
      };
    case salesTypes.SET_SALES_PER_MONTH:
      return {
        ...state,
        salesPerMonth: action.payload
      };
    case salesTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
