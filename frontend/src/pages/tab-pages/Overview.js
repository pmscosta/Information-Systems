import React from "react";
import ValueCard from "../../components/ValueCard";
import { useSelector } from "react-redux";

const Overview = () => {
  const { loading: iloading, inventory } = useSelector(
    state => state.inventory
  );
  const { loading: ploading, purchases } = useSelector(
    state => state.purchases
  );

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
};

export default Overview;
