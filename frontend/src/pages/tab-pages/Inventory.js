import React from "react";
import { useSelector } from "react-redux";
import AppLinearProgress from "../../components/AppLinearProgress";

const Inventory = () => {
  const { loading, inventory } = useSelector(state => state.inventory);

  return (
    <>
      {loading && (
        <>
          <br /> <AppLinearProgress />
        </>
      )}
      {inventory.map(item => {
        return (
          <div key={item.itemKey}>
            <span>
              {item.description}
              {"\t"}
              {item.itemKey}
            </span>
            {item.warehouses.map(wh => {
              if (wh.stockBalance !== 0)
                return (
                  <div>
                    In warehouse:
                    <li key={0}>{wh.balanceAmount}</li>
                    <li key={1}>{wh.stockBalance}</li>
                    <li key={2}>{wh.unitAmount}</li>
                  </div>
                );
              return "";
            })}
          </div>
        );
      })}
    </>
  );
};

export default Inventory;
