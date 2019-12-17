import React from "react";
import ValueCard from "../../components/ValueCard";
import { useSelector } from "react-redux";
import SimpleCard from "../../components/cards/SimpleCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container } from "@material-ui/core";

import "./Overview.css";

const Overview = () => {
  const { loading: iloading, inventoryBalance } = useSelector(
    state => state.inventory
  );
  const { loading: ploading, purchases, totalReceiptValue } = useSelector(
    state => state.purchases
  );
  const { loading: sloading, totalSales } = useSelector(state => state.sales);

  const { loading: cloading, cashflow } = useSelector(state => state.cashflow);

  return (
    <Container id="overview-page">
      {ploading ? (
        <CircularProgress />
      ) : (
        <SimpleCard
          label="PURCHASES"
          to="/purchases"
          number={totalReceiptValue}
        />
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
    </Container>
  );
};

export default Overview;
