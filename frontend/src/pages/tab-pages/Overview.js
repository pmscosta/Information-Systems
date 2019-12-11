import React from "react";
import ValueCard from "../../components/ValueCard";
import { useSelector } from "react-redux";
import SimpleCard from "../../components/cards/SimpleCard";

const Overview = () => {
  const { loading: iloading, inventory } = useSelector(
    state => state.inventory
  );
  const { loading: ploading, purchases } = useSelector(
    state => state.purchases
  );

  return (
    <>
      <SimpleCard label="PURCHASES" to="/purchases" number="123" />
    </>
  );
};

export default Overview;
