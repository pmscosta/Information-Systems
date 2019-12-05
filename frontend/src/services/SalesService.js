import axios from "axios";

import { createGraphData } from "./utils";

export function getSalesInfo() {
  return axios.get("/api/jasmin/sales").then(res => {
    const open = res.data.open;
    const invoiced = res.data.invoiced;

    const graphData = createGraphData("Sales", invoiced);

    const totalOpenValue = open.reduce((a, b) => a + b.amount, 0);
    const totalReceiptValue = invoiced.reduce((a, b) => a + b.amount, 0);

    return {
      open,
      invoiced,
      totalOpenValue,
      totalReceiptValue,
      graphData
    };
  });
}
