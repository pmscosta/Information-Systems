import { purchasesTypes } from "../actions/purchasesActions";
import {
  createGraphData,
  createItemsData,
  createSuppliersData
} from "../services/utils";

const initialState = {
  loading: false,
  purchases: [],
  purchasesError: null,
  open: [],
  invoiced: [],
  totalOpenValue: 0,
  totalReceiptValue: 0,
  graphData: null,
  itemsData: null,
  suppliersData: null,
  payments: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case purchasesTypes.SET_PURCHASES_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case purchasesTypes.SET_PURCHASES: {
      const invoiced = action.payload.invoiced;
      const open = action.payload.open;
      return {
        ...state,
        invoiced: invoiced,
        payments: action.payload.payments,
        open: open,
        purchases: action.payload,
        totalReceiptValue: invoiced
          .reduce((a, b) => a + b.amount, 0)
          .toFixed(2),
        totalOpenValue: open.reduce((a, b) => a + b.amount, 0).toFixed(2),
        graphData: createGraphData("Purchases", invoiced),
        itemsData: createItemsData("Items", invoiced),
        suppliersData: createSuppliersData("Suppliers", invoiced)
      };
    }
    case purchasesTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
