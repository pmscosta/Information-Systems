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
  suppliersData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case purchasesTypes.SET_PURCHASES_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case purchasesTypes.SET_PURCHASES: {
      let invoiced = action.payload.invoiced;
      let open = action.payload.open;
      const payments = action.payload.payments;

      return {
        ...state,
        invoiced: invoiced,
        open: open,
        purchases: action.payload,
        accountsPayable: invoiced
          .filter(({ naturalKey }) => {
            return !payments.find(x => x.sourceDoc === naturalKey);
          })
          .reduce((a, b) => a + b.payableAmount, 0)
          .toFixed(2),
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

// const open = res.data.open;
// let invoiced = res.data.invoiced;

// const graphData = createGraphData("Purchases", invoiced);

// const itemsData = createItemsData("Items", invoiced);

// const suppliersData = createSuppliersData("Suppliers", invoiced);

// console.log(suppliersData);

// const totalOpenValue = open.reduce((a, b) => a + b.amount, 0);
// const totalReceiptValue = invoiced.reduce((a, b) => a + b.amount, 0);

// return {
//   open,
//   invoiced,
//   totalOpenValue,
//   totalReceiptValue,
//   graphData,
//   itemsData,
//   suppliersData
