import axios from "axios";

export function getSalesInfo() {
  return axios.get("/api/jasmin/sales").then(res => {
    console.log(res);

    const openPurchases = res.data.open;
    const receiptPurchases = res.data.invoiced;

    receiptPurchases.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    console.log(receiptPurchases);

    const purchasesEvolution = receiptPurchases.reduce((r, a) => {
      let prev_amount = r.length > 0 ? r[r.length - 1].value : 0;
      let prev_date = r.length > 0 ? r[r.length - 1].time : "";

      // if the purchase day is the same, don't create a new graph node, just add it
      if (
        prev_date !== "" &&
        new Date(prev_date).getDate() === new Date(a.date).getDate()
      ) {
        r[r.length - 1].value += a.amount;
        return r;
      } else {
        let b = {
          time: a.date,
          value: a.amount + prev_amount
        };
        r.push(b);
        return r;
      }
    }, []);

    const purchasesGraphData = {
      title: "Purchases",
      data: purchasesEvolution
    };

    const totalOpenValue = openPurchases.reduce((a, b) => a + b.amount, 0);
    const totalReceiptValue = receiptPurchases.reduce(
      (a, b) => a + b.amount,
      0
    );

    return {
      openPurchases,
      receiptPurchases,
      totalOpenValue,
      totalReceiptValue,
      purchasesGraphData
    };
  });
}
