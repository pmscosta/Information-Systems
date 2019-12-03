import axios from "axios";

export function getPurchasesInfo() {
  return axios.get("/api/jasmin/purchases").then(res => {
    console.log(res);

    const open = res.data.open;
    const invoiced = res.data.invoiced;

    invoiced.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    const purchasesEvolution = invoiced.reduce((r, a) => {
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

    const graphData = {
      title: "Purchases",
      data: purchasesEvolution
    };

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
