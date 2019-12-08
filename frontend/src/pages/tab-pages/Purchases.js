import React from "react";
import LineChart from "../../components/LineChart/LineChart";
import { getData } from "../../utils/data_generator";
import BarChart from "../../components/BarChart/BarChart";
import { useSelector } from "react-redux";
import AppLinearProgress from "../../components/AppLinearProgress";

const Purchases = () => {
  const {
    loading,
    totalOpenValue,
    totalReceiptValue,
    graphData,
    itemsData,
    suppliersData
  } = useSelector(state => state.purchases);
  console.log(loading);
  console.log(itemsData);
  return (
    <>
      <div>Total Open Value: {totalOpenValue}</div>
      <div>Total Receipt Value: {totalReceiptValue}</div>
      {loading && <AppLinearProgress />}
      {graphData && itemsData && suppliersData && (
        <>
          <div className="main chart-wrapper">
            <LineChart
              data={[graphData]}
              title="Purchases"
              color="#3E517A"
            ></LineChart>
          </div>

          <div className="main chart-wrapper">
            <BarChart
              data={itemsData}
              title="Purchases"
              color="#3E517A"
            ></BarChart>
          </div>

          <div className="main chart-wrapper">
            <BarChart
              data={suppliersData}
              title="Purchases"
              color="#3E517A"
            ></BarChart>
          </div>
        </>
      )}
    </>
  );
};

export default Purchases;
