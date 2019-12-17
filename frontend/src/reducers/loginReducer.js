import { loginTypes } from "../actions/loginActions";

const initialState = {
  loggedIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case loginTypes.SET_LOGIN:
      return {
        loggedIn: action.payload
      };
    default:
      return state;
  }
};
