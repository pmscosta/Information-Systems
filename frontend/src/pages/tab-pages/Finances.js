import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

class Finances extends React.Component {
  constructor(props) {
    super(props);
    this.props = {
      ...props,
      costsOfGoodsSold: 0
    };
  }
  render() {
    return (
      <>
        <div>Accounts Payable: {this.props.accountsPayable}</div>
        <div>Accounts Receivable: {this.props.accountsReceivable}</div>
        <div>Costs Of Goods Sold: {this.props.costsOfGoodsSold}</div>
        <div>
          Net Profit Margin:{" "}
          {((parseInt(this.props.totalSales) - this.props.costsOfGoodsSold) *
            100) /
            parseInt(this.props.totalSales)}
          %
        </div>
        <div>Cashflow Data: {this.props.cashFlowData}</div>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.sales);
  return {
    accountsPayable: state.purchases.invoiced
      .filter(({ naturalKey }) => {
        return !state.purchases.payments.find(x => x.sourceDoc === naturalKey);
      })
      .reduce((a, b) => a + b.payableAmount, 0)
      .toFixed(2),
    accountsReceivable: state.sales.invoices.reduce(
      (a, b) => a + b.netTotal,
      0
    ),
    costsOfGoodsSold: 0,
    cashFlowData: [],
    totalSales: state.sales.totalSales
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Finances);
