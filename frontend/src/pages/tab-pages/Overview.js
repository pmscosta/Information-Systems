import React from "react";
import ValueCard from "../../components/ValueCard";

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
