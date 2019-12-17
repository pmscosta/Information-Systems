import React from "react";
import ValueCard from "../../components/ValueCard";
import { useSelector } from "react-redux";
import SimpleCard from "../../components/cards/SimpleCard";
import CircularProgress from "@material-ui/core/CircularProgress";

const Overview = () => {
  const { loading: iloading, inventoryBalance } = useSelector(
    state => state.inventory
  );
  const { loading: ploading, purchases } = useSelector(
    state => state.purchases
  );
  const {
    loading: sloading,
    totalSales
    // loading,
    // topClients,
    // clients,
    // invoices,
    // topSoldProducts,
    // salesPerMonth
  } = useSelector(state => state.sales);

  const { loading: cloading, cashflow } = useSelector(state => state.cashflow);

  return (
    <>
      {ploading ? (
        <CircularProgress />
      ) : (
        <SimpleCard label="PURCHASES" to="/purchases" number={0} />
      )}
      {sloading ? (
        <CircularProgress />
      ) : (
        <SimpleCard label="SALES" to="/sales" number={totalSales} />
      )}
      {iloading ? (
        <CircularProgress />
      ) : (
        <SimpleCard
          label="INVENTORY"
          to="/inventory"
          number={inventoryBalance}
        />
      )}
      {cloading ? (
        <CircularProgress />
      ) : (
        <SimpleCard label="CASHFLOW" to="/finances" number={cashflow} />
      )}
    </>
  );
};

export default Overview;
