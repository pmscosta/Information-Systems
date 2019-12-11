import { salesTypes } from "../actions/salesActions";

const initialState = {
  loading: false,
  sales: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case salesTypes.SET_SALES_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case salesTypes.SET_SALES:
      return {
        ...state,
        sales: action.payload
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
