import React from "react";
import ValueCard from "../../components/ValueCard";
import { useSelector } from "react-redux";
import SimpleCard from "../../components/cards/SimpleCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, Typography } from "@material-ui/core";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import { makeStyles } from "@material-ui/core/styles";
import "./Overview.css";
import Divider from "@material-ui/core/Divider";

const Overview = () => {
  const { loading: iloading, inventory, inventoryBalance } = useSelector(
    state => state.inventory
  );
  const {
    loading: ploading,
    invoiced,
    payments,
    totalReceiptValue
  } = useSelector(state => state.purchases);
  const { loading: sloading, totalSales, invoices, paidSales } = useSelector(
    state => state.sales
  );

  const useStyles = makeStyles({
    warning: {
      fontFamily: "sans-serif",
      color: "#A239CA",
      textAlign: "center",
      marginRight: "1em"
    },
    report: {
      fontWeight: "bolder",
      fontSize: "large"
    },
    divider: {
      marginTop: "4em"
    }
  });

  const classes = useStyles();

  const breakdown = inventory.filter(({ stockBalance }) => {
    return stockBalance <= 0;
  });

  let cashflow = calculateCashflow(invoiced, payments, invoices, paidSales);
  console.log(cashflow);
  if (cashflow.data) cashflow = cashflow.data[cashflow.data.length - 1].value;

  return (
    <Container id="overview-page">
      <div id="overview-inital-cards">
        {ploading || sloading ? (
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
      <Divider className={classes.divider} variant="inset" />
      <Container id="overview-breakdown">
        {breakdown.length > 0 ? (
          iloading ? (
            <CircularProgress />
          ) : (
            <div className="graph-wrapper" style={{ textAlign: "center" }}>
              <Typography className={classes.report}>
                <ReportProblemIcon
                  className={classes.warning}
                  style={{ color: "#f1af09" }}
                />
                WARNING - THESE PRODUCTS ARE OUT OF STOCK
              </Typography>
              <div
                className="overview-breakdown-cards"
                style={{ align: "center" }}
              >
                {breakdown.map(item => (
                  <SimpleCard
                    label={item.itemKey}
                    unit=" "
                    number={item.description}
                  />
                ))}
              </div>
            </div>
          )
        ) : (
          <></>
        )}
      </Container>
    </Container>
  );
};

const calculateCashflow = (
  purchases_invoices,
  purchases_payments,
  sales_invoices,
  sales_payments
) => {
  let cashFlow = [];

  if (
    Array.isArray(purchases_invoices) &&
    purchases_invoices.length &&
    Array.isArray(sales_invoices) &&
    sales_invoices.length
  ) {
    const only_invoices = sales_invoices.map(invoice => {
      return { ...invoice.invoice, date: invoice.invoice.invoiceDate };
    });

    const paid_purchases = purchases_invoices.filter(({ naturalKey }) => {
      return purchases_payments.find(x => x.sourceDoc === naturalKey);
    });

    const paid_sales = only_invoices.filter(({ invoiceNo }) => {
      return sales_payments.find(
        x =>
          x.sourceDoc.replace(/\.|\//g, " ") ===
          invoiceNo.replace(/\.|\//g, " ")
      );
    });

    const purchases_and_sales = paid_sales.concat(paid_purchases);

    purchases_and_sales.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    const data = purchases_and_sales.reduce((r, a) => {
      let prev_amount = r.length > 0 ? r[r.length - 1].value : 0;
      let prev_date = r.length > 0 ? r[r.length - 1].time : "";

      let newVal = 0;

      if (a.netTotal !== undefined && a.netTotal !== null) {
        newVal = a.grossTotal;
      } else {
        newVal = -a.payableAmount;
      }

      if (new Date(prev_date).getTime() === new Date(a.date).getTime()) {
        r[r.length - 1].value += newVal;
        return r;
      } else {
        let b = {
          time: a.date,
          value: newVal + prev_amount
        };
        r.push(b);
        return r;
      }
    }, []);

    cashFlow = { title: "CashFlow", data: data };
  }

  return cashFlow;
};

export default Overview;
