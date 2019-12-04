import React from "react";
import Chart from "chart.js";

import "./BarChart.css";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  createDataset(items) {
    let data = [];
    Object.keys(items).forEach(key => {
      data.push(items[key].quantity);
    });

    return {
      label: "Quantity (UN)",
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      data
    };
  }

  createLabels() {
    let labels = [];
    Object.keys(this.props.data).forEach(key => {
      labels.push(key);
    });

    return labels;
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "horizontalBar",
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0
              }
            }
          ]
        },
        elements: {
          rectangle: {
            borderWidth: 1
          }
        },
        responsive: true
      },
      data: {
        labels: this.createLabels(),
        datasets: [this.createDataset(this.props.data)]
      }
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default BarChart;
