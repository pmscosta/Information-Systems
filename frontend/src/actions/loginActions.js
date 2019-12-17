export const inventoryTypes = Object.freeze({
  SET_LOGIN: "login/set-data"
});

export const setLogin = login => ({
  type: inventoryTypes.SET_LOGIN,
  payload: login
});
