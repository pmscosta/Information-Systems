import React from "react";
import MainPageLayout from "../../components/layout/MainPageLayout";
import ValueCard from "../../components/ValueCard";
import {
  setPurchasesLoading,
  setInventoryLoading,
  setPurchasesData,
  setInventoryData
} from "../../actions/jasminActions";

class Overview extends React.Component {
  render() {
    return (
      <>
        <ValueCard name="Purchases" value="123k" />
        <ValueCard name="Sales" value="343k" />
        <ValueCard name="Equity" value="53k" />
        <br />
        <ValueCard name="Purchases" value="123k" />
        <ValueCard name="Sales" value="343k" />
        <ValueCard name="Equity" value="53k" />
        <br />
        <ValueCard name="Purchases" value="123k" />
        <ValueCard name="Sales" value="343k" />
        <ValueCard name="Equity" value="53k" />
      </>
    );
  }
}

export default Overview;
