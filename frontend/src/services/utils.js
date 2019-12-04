export const createGraphData = (title, invoiced) => {
  console.log(invoiced);
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
    title,
    data: purchasesEvolution
  };

  return graphData;
};

export const createItemsData = (title, invoiced) => {
  const grouped = invoiced.reduce((a, b) => {
    console.log(b.item);
    if (!a[b.item.itemId]) {
      a[b.item.itemId] = { description: b.item.description, quantity: 0 };
    }
    a[b.item.itemId].quantity += b.item.quantity;
    return a;
  }, {});

  return grouped;
};
