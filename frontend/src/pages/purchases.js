import React from "react";
import Graph from "../components/graph/Graph";
import axios from "axios";
import { getPurchasesInfo } from "../services/PurchasesService";
import { getData } from "../utils/data_generator";

class Purchases extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData(),
      openPurchases: [], // keeps the sourceDocs of the purchases whose receipt was created
      receiptPurchases: [],
      totalOpenValue: 0,
      totalReceiptValue: 0
    };
  }

  componentDidMount() {
    getPurchasesInfo().then(result => {
      console.log(result);
      this.setState({
        openPurchases: result.openPurchases,
        receiptPurchases: result.receiptPurchases,
        totalOpenValue: result.totalOpenValue,
        totalReceiptValue: result.totalReceiptValue
      });
    });
  }

  render() {
    return (
      <>
        <div>Total Open Value: {this.state.totalOpenValue}</div>
        <div>Total Receipt Value: {this.state.totalReceiptValue}</div>
      </>
    );
  }
}

export default Purchases;
