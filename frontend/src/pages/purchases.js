import React from "react";
import LineChart from "../components/LineChart/LineChart";
import { getPurchasesInfo } from "../services/PurchasesService";
import { getData } from "../utils/data_generator";
import BarChart from "../components/BarChart/BarChart";

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
    getPurchasesInfo().then(result => {
      console.log(result);
      this.setState({
        openPurchases: result.open,
        receiptPurchases: result.invoiced,
        totalOpenValue: result.totalOpenValue,
        totalReceiptValue: result.totalReceiptValue,
        dataGraph: result.graphData,
        itemData: result.itemsData,
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
          <>
            <div className="main chart-wrapper">
              <LineChart
                data={[this.state.dataGraph]}
                title="Purchases"
                color="#3E517A"
              ></LineChart>
            </div>

            <div className="main chart-wrapper">
              <BarChart
                data={this.state.itemData}
                title="Purchases"
                color="#3E517A"
              ></BarChart>
            </div>
          </>
        )}
      </>
    );
  }
}

export default Purchases;
