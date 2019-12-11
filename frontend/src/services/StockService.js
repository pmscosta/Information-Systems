import axios from "axios";

export function getItems(setItems) {
  return axios.get("/api/jasmin/stock").then(res => {
    if (setItems) setItems(res);
    return res.data;
  });
}
