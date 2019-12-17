import React from "react";
import ValueCard from "../../components/ValueCard";
import { useSelector } from "react-redux";
import SimpleCard from "../../components/cards/SimpleCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, Typography } from "@material-ui/core";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import { makeStyles } from "@material-ui/core/styles";
import "./Overview.css";

const Overview = () => {
  const { loading: iloading, inventory, inventoryBalance } = useSelector(
    state => state.inventory
  );
  const { loading: ploading, purchases, totalReceiptValue } = useSelector(
    state => state.purchases
  );
  const { loading: sloading, totalSales } = useSelector(state => state.sales);

  const { loading: cloading, cashflow } = useSelector(state => state.cashflow);

  const useStyles = makeStyles({
    warning: {
      fontFamily: "sans-serif",
      color: "#A239CA",
      textAlign: "center"
    }
  });

  const breakdown = inventory.filter(({ stockBalance }) => {
    return stockBalance <= 0;
  });

  return (
    <Container id="overview-page">
      <div id="overview-card">
        {cloading ? (
          <CircularProgress />
        ) : (
          <SimpleCard label="CASHFLOW" to="/finances" number={cashflow} />
        )}
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
      </div>
      {breakdown.length > 0 ? (
        iloading ? (
          <CircularProgress />
        ) : (
          <div className="graph-wrapper" style={{ textAlign: "center" }}>
            {/* <Typography > //className={useStyles().warning} */}
            <Typography>
              <ReportProblemIcon style={{ color: "#f1af09" }} /> WARNING - THESE
              PRODUCTS ARE OUT OF STOCK
            </Typography>
            <Container id="overview-page">
              <div id="overview-card" style={{ align: "center" }}>
                {breakdown.map(item => (
                  <SimpleCard
                    label={item.itemKey}
                    unit=" "
                    number={item.description}
                  />
                ))}
              </div>
            </Container>
          </div>
        )
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Overview;
