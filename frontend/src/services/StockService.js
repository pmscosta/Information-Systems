import axios from "axios";

export function getItems() {
  return axios.get("/api/jasmin/stock").then(res => {
    return res.data;
  });
}
