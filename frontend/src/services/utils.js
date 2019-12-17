export const createGraphData = (title, invoiced) => {
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
  const temp = invoiced.reduce((a, b) => {
    const idx = a.findIndex(x => x.key === b.item.itemId);

    if (idx === -1) {
      const entry = {
        key: b.item.itemId,
        description: b.item.description,
        quantity: b.item.quantity,
        value: b.amount
      };
      a.push(entry);
    } else {
      a[idx].quantity += b.item.quantity;
      a[idx].value += b.amount;
    }

    return a;
  }, []);

  temp.sort((a, b) => {
    return b.quantity - a.quantity;
  });

  return temp.slice(0, 5);
};

export const createSuppliersData = (title, invoiced) => {
  const temp = invoiced.reduce((a, b) => {
    const idx = a.findIndex(x => x.key === b.supplier);

    if (idx === -1) {
      const entry = {
        key: b.supplier,
        quantity: b.item.quantity,
        value: b.amount
      };
      a.push(entry);
    } else {
      a[idx].quantity += b.item.quantity;
      a[idx].value += b.amount;
    }

    return a;
  }, []);

  temp.sort((a, b) => {
    return b.quantity - a.quantity;
  });

  return temp.slice(0, 5);
};
