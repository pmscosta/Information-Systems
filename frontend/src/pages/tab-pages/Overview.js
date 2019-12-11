import React from "react";
import ValueCard from "../../components/ValueCard";
import { useSelector } from "react-redux";
import SimpleCard from "../../components/cards/SimpleCard";
import CircularProgress from "@material-ui/core/CircularProgress";

const Overview = () => {
  const { loading: iloading, inventory } = useSelector(
    state => state.inventory
  );
  const { loading: ploading, purchases } = useSelector(
    state => state.purchases
  );
  const {
    loading: sloading,
    totalSales,
    loading,
    topClients,
    clients,
    invoices,
    topSoldProducts,
    salesPerMonth
  } = useSelector(state => state.sales);
  console.log(
    loading,
    topClients,
    clients,
    invoices,
    topSoldProducts,
    salesPerMonth
  );
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
    </>
  );
};

export default Overview;
