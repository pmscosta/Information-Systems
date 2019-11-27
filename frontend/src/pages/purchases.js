import React from "react";
import Graph from "../components/graph/Graph";
import axios from "axios";
import { getData } from "../utils/data_generator";

class Purchases extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData(),
      jasminResponse: "",
      totalValue: 0
    };
  }

  componentDidMount() {
    // window.setInterval(() => {
    //   this.setState({
    //     data: getData()
    //   });
    // }, 5000);

    axios.get("/api/jasmin/billing").then(res => {
      console.log(res);
      this.setState({ jasminResponse: res });

      this.calculateValue();
    });
  }

  calculateValue() {
    let value = 0;
    let visitedSeries = [];
    this.state.jasminResponse.data.forEach(element => {
      if (!element.isDeleted && !visitedSeries.includes(element.seriesNumber)) {
        visitedSeries.push(element.seriesNumber);
        value += element.grossValue.amount;
        console.log(element.payableAmount.amount);
      }
    });

    this.setState({ totalValue: value });
  }

  render() {
    return (
      <div>{this.state.totalValue}</div>
      // <div className="main chart-wrapper">
      //   <Graph
      //     data={this.state.data[0].data}
      //     title={this.state.data[0].title}
      //     color="#3E517A"
      //   />
      // </div>
    );
  }
}

export default Purchases;
