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
    console.log(this.props);
    return (
      <>
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
        <div>Cashflow Data: {this.props.cashFlowData}</div>
      </>
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
    let den = 0;
    items.forEach(item => {
      nom += item.value * item.quantity;
      den += item.quantity;
    });

    const res = nom / den;

    return res;
  }
  return 0;
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    accountsPayable: state.purchases.invoiced
      .filter(({ naturalKey }) => {
        return !state.purchases.payments.find(x => x.sourceDoc === naturalKey);
      })
      .reduce((a, b) => a + b.payableAmount, 0)
      .toFixed(2),
    accountsReceivable: state.sales.invoices.reduce(
      (a, b) => a + b.invoice.netTotal,
      0
    ),
    costsOfGoodsSold: calculateCOGS(
      state.purchases.all_purchases,
      state.sales.invoices
    ).toFixed(2),
    cashFlowData: [],
    totalSales: parseInt(state.sales.totalSales)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finances);
