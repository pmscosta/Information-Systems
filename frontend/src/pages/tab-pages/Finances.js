import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
// import React, { useEffect, useState } from "react";
import ValueCard from "../../components/ValueCard";
import SimpleCard from "../../components/cards/SimpleCard";
import { Container } from "@material-ui/core";
import SimpleValueCard from "../../components/SimpleValueCard";
import AppLinearProgress from "../../components/AppLinearProgress";
import LineChart from "../../components/LineChart/LineChart";
import { setCashflowData } from "../../actions/cashFlowActions";
import "./Finances.css";

class Finances extends React.Component {
  constructor(props) {
    super(props);
    this.props = {
      ...props,
      totalSales: 0,
      costsOfGoodsSold: 0
    };
  }

  render() {
    return (
      <Container id="finances-page">
        <div id="finances-card">
          <SimpleCard
            label="ACCOUNTS PAYABLE"
            number={this.props.accountsPayable}
          />
          <SimpleCard
            label="ACCOUNTS RECEIVABLE"
            number={this.props.accountsReceivable}
          />
          <SimpleCard
            label="COSTS OF GOODS SOLD"
            number={this.props.costsOfGoodsSold}
          />
          <SimpleCard
            label="NET PROFIT MARGIN"
            number={(
              ((this.props.totalSales - this.props.costsOfGoodsSold) * 100) /
              this.props.totalSales
            ).toFixed(0)}
            unit="%"
          ></SimpleCard>
        </div>
        <div className="graph-wrapper">
          <span className="graph-title"> Purchases Timeline</span>
          {Array.isArray(this.props.cashFlowData.data) &&
            this.props.cashFlowData.data.length && (
              <LineChart
                data={this.props.cashFlowData}
                title="Purchases"
                color="#3BA9E0"
              ></LineChart>
            )}
        </div>
      </Container>
    );
  }
}

const calculateCOGS = (all_purchases, invoices) => {
  if (Array.isArray(all_purchases) && Array.isArray(invoices)) {
    const items = [];
    invoices.forEach(invoice => {
      invoice.prods.forEach(prod => {
        const bought = all_purchases.find(
          x => x.item.itemId === prod.productCode
        );

        if (bought !== null && bought !== undefined) {
          const idx = items.findIndex(x => x.itemId === bought.item.itemId);

          if (idx === -1) {
            items.push({
              itemId: bought.item.itemId,
              value: bought.item.value * prod.quantity,
              quantity: prod.quantity
            });
          } else {
            items[idx].value += bought.item.value * prod.quantity;
            items[idx].quantity += prod.quantity;
          }
        }
      });
    });

    let nom = 0;
    // let den = 0;
    items.forEach(item => {
      nom += item.value;
      // den += item.quantity;
    });

    const res = nom;

    return res;
  }
  return 0;
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

const mapDispatchToProps = {
  setCashflowData
};

const mapStateToProps = state => {
  return {
    accountsPayable: state.purchases.invoiced
      .filter(({ naturalKey }) => {
        return !state.purchases.payments.find(x => x.sourceDoc === naturalKey);
      })
      .reduce((a, b) => a + b.payableAmount, 0)
      .toFixed(2),
    accountsReceivable: state.sales.invoices
      .filter(({ invoice }) => {
        return !state.sales.paidSales.find(
          x =>
            x.sourceDoc.replace(/\.|\//g, " ") ===
            invoice.invoiceNo.replace(/\.|\//g, " ")
        );
      })
      .reduce((a, b) => a + b.invoice.grossTotal, 0),
    costsOfGoodsSold: calculateCOGS(
      state.purchases.all_purchases,
      state.sales.invoices
    ).toFixed(2),
    cashFlowData: calculateCashflow(
      state.purchases.invoiced,
      state.purchases.payments,
      state.sales.invoices,
      state.sales.paidSales
    ),
    totalSales: parseInt(state.sales.totalSales)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finances);
