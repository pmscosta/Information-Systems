import React from "react";
import LineChart from "../../components/LineChart/LineChart";
import BarChart from "../../components/BarChart/BarChart";
import { useSelector } from "react-redux";
import AppLinearProgress from "../../components/AppLinearProgress";
import { Container } from "@material-ui/core";

import "./Purchases.css";
import SimpleValueCard from "../../components/SimpleValueCard";

const Sales = () => {
  const {
    loading,
    topClients,
    totalSales,
    topSoldProducts,
    salesPerMonth
  } = useSelector(state => state.sales);

  return (
    <>
      {loading && <AppLinearProgress />}
      {!loading && (
        <Container id="purchases-page">
          <Container id="purchases-bar-graph">
            <div className="graph-wrapper">
              <span className="graph-title"> Top Sold Products</span>
              <BarChart
                data={topSoldProducts}
                title="Purchases"
                color="#3E517A"
                togglable={true}
              ></BarChart>
            </div>
            {topClients !== [] && (
              <div className="graph-wrapper">
                <span className="graph-title"> Top Clients</span>
                <BarChart
                  data={topClients}
                  title="Purchases"
                  color="#3E517A"
                  togglable={false}
                ></BarChart>
              </div>
            )}
          </Container>
          <Container id="purchases-line-graph">
            <div className="graph-wrapper">
              <span className="graph-title"> Sales Timeline</span>

              {Array.isArray(salesPerMonth.data) && (
                <LineChart
                  data={salesPerMonth}
                  title="Purchases"
                  color="#3BA9E0"
                ></LineChart>
              )}
            </div>
            <div className="vertical-cards">
              <SimpleValueCard name="Total Sales" value={`${totalSales} €`} />
              {/* <SimpleValueCard
                name="Received but not invoiced"
                value={`${totalOpenValue} €`}
              /> */}
            </div>
          </Container>
        </Container>
      )}
    </>
  );
};

export default Sales;
