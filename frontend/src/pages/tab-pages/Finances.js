import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

class Finances extends React.Component {
  render() {
    return (
      <>
        <div>Accounts Payable: {this.props.accountsPayable}</div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    accountsPayable: state.purchases.invoiced
      .filter(({ naturalKey }) => {
        return !state.purchases.payments.find(x => x.sourceDoc === naturalKey);
      })
      .reduce((a, b) => a + b.payableAmount, 0)
      .toFixed(2)
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Finances);
