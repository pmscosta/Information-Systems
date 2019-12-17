export const loginTypes = Object.freeze({
  SET_LOGIN: "login/set-data"
});

export const setLogin = login => ({
  type: loginTypes.SET_LOGIN,
  payload: login
});
