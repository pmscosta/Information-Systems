import React from "react";
import Graph from "../components/graph/Graph";
import { getSalesInfo } from "../services/SalesService";
import { getData } from "../utils/data_generator";

class Purchases extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData(),
      openPurchases: [], // keeps the sourceDocs of the purchases whose receipt was created
      receiptPurchases: [],
      totalOpenValue: 0,
      totalReceiptValue: 0,
      dataGraph: {},
      graphLoaded: false
    };
  }

  componentDidMount() {
    getSalesInfo().then(result => {
      console.log(result);
      this.setState({
        openPurchases: result.open,
        receiptPurchases: result.invoiced,
        totalOpenValue: result.totalOpenValue,
        totalReceiptValue: result.totalReceiptValue,
        dataGraph: result.graphData,
        graphLoaded: true
      });
    });
  }

  render() {
    return (
      <>
        <div>Total Open Value: {this.state.totalOpenValue}</div>
        <div>Total Receipt Value: {this.state.totalReceiptValue}</div>
        {this.state.graphLoaded && (
          <div className="main chart-wrapper">
            <Graph
              data={[this.state.dataGraph]}
              title="Sales"
              color="#3E517A"
            ></Graph>
          </div>
        )}
      </>
    );
  }
}

export default Purchases;
