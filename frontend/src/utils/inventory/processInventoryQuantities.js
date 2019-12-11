const processInventoryQuantities = items => {
  let ret = {};
  console.log(items);
  ret = items.map(item => {
    return {
      name: item.description,
      size: item.warehouses.reduce((sum, currentValue) => {
        return sum + currentValue.stockBalance;
      }, 0),
      children: {
        name: item.description,
        size: item.warehouses.reduce((sum, currentValue) => {
          return sum + currentValue.stockBalance;
        }, 0)
      }
    };
  });
  return ret;
};

export default processInventoryQuantities;
