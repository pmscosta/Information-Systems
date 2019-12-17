import { salesTypes } from "../actions/salesActions";

const initialState = {
  loading: false,
  topClients: [],
  clients: [],
  invoices: [],
  totalSales: 0,
  topSoldProducts: [],
  salesPerMonth: [],
  paidSales: [],
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
      const topClients = action.payload.splice(0, 4).reduce((a, b) => {
        a[b.customer.CustomerID] = {
          quantity: 0,
          value: b.totalSpent.toFixed(2)
        };
        return a;
      }, {});
      return {
        ...state,
        topClients
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
        totalSales: action.payload[0].TotalSalesValue.toFixed(0)
      };
    case salesTypes.SET_TOP_SOLD_PRODUCTS:
      const topSoldProducts = action.payload.splice(0, 4).reduce((a, b) => {
        a[b._id] = { quantity: b.count, value: b.salesValue.toFixed(2) };
        return a;
      }, {});
      return {
        ...state,
        topSoldProducts
      };
    case salesTypes.SET_SALES_PER_MONTH:
      let orderedSales = action.payload;

      orderedSales.sort((a, b) => {
        return new Date(a._id.date) - new Date(b._id.date);
      });

      const salesPerMonth = orderedSales.reduce((a, b) => {
        let prev_amount = a.length > 0 ? a[a.length - 1].value : 0;
        const date = new Date(b._id.date);
        const val = b.total;
        a.push({ time: date, value: val + prev_amount });
        return a;
      }, []);

      const graphData = {
        title: "Sales",
        data: salesPerMonth
      };

      return {
        ...state,
        salesPerMonth: graphData
      };
    case salesTypes.SET_SALES_PAID:
      const paidSales = action.payload;

      return {
        ...state,
        paidSales: paidSales.payments
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
