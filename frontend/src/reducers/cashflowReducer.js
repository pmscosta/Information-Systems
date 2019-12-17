import { cashflowTypes } from "../actions/cashFlowActions";

const initialState = {
  loading: false,
  cashflow: 0,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case cashflowTypes.SET_INVENTORY_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case cashflowTypes.SET_INVENTORY:
      return {
        ...state,
        inventory: action.payload
      };
    case cashflowTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
