import { purchasesTypes } from "../actions/purchasesActions";

const initialState = {
  loading: false,
  purchases: [],
  purchasesError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case purchasesTypes.SET_PURCHASES_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case purchasesTypes.SET_PURCHASES:
      return {
        ...state,
        purchases: action.payload
      };
    case purchasesTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
