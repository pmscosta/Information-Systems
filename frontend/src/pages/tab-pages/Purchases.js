import React from "react";
import LineChart from "../../components/LineChart/LineChart";
import BarChart from "../../components/BarChart/BarChart";
import { useSelector } from "react-redux";
import AppLinearProgress from "../../components/AppLinearProgress";
import { Container } from "@material-ui/core";

import "./Purchases.css";
import SimpleValueCard from "../../components/SimpleValueCard";
import SimpleCard from "../../components/cards/SimpleCard";

const Purchases = () => {
  const {
    loading,
    totalReceiptValue,
    totalOpenValue,
    graphData,
    itemsData,
    suppliersData
  } = useSelector(state => state.purchases);
  return (
    <>
      {loading && <AppLinearProgress />}
      {graphData && itemsData && suppliersData && (
        <Container id="purchases-page">
          <Container id="purchases-bar-graph">
            <div className="graph-wrapper">
              <span className="graph-title"> Top Purchased Products</span>
              <BarChart
                data={itemsData}
                title="Purchases"
                color="#3E517A"
                togglable={true}
              ></BarChart>
            </div>

            <div className="graph-wrapper">
              <span className="graph-title"> Top Suppliers</span>
              <BarChart
                data={suppliersData}
                title="Purchases"
                color="#3E517A"
                togglable={true}
              ></BarChart>
            </div>
          </Container>
          <Container id="purchases-line-graph">
            <div className="graph-wrapper">
              <span className="graph-title"> Purchases Timeline</span>
              <LineChart
                data={graphData}
                title="Purchases"
                color="#3BA9E0"
              ></LineChart>
            </div>
            <div className="vertical-cards">
              <SimpleCard label="Total Purchases" number={totalReceiptValue} />
              <SimpleCard
                label="Received but not invoiced"
                number={totalOpenValue}
              />
            </div>
          </Container>
        </Container>
      )}
    </>
  );
};

export default Purchases;
