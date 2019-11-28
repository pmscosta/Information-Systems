import axios from "axios";

export function getPurchasesInfo() {
  return axios.get("/api/jasmin/purchases").then(res => {
    console.log(res);

    const openPurchases = res.data.openPurchases;
    const receiptPurchases = res.data.receiptPurchases;
    const totalOpenValue = openPurchases.reduce((a, b) => a + b.amount, 0);
    const totalReceiptValue = receiptPurchases.reduce(
      (a, b) => a + b.amount,
      0
    );

    return {
      openPurchases,
      receiptPurchases,
      totalOpenValue,
      totalReceiptValue
    };
  });
}
