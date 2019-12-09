import React from "react";
import Chart from "chart.js";

import "./LineChart.css";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  createDataset(data) {
    return {
      label: data.title,
      data: data.data.map(d => d.value),
      fill: "none",
      backgroundColor: this.props.color,
      pointRadius: 4,
      borderColor: this.props.color,
      borderWidth: 3,
      lineTension: 0
    };
  }

  createLabels(dataset) {
    return dataset.data.map(d => d.time);
  }

  sortLabels(labels) {
    labels.sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    return labels;
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "line",
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "week"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      },
      data: {
        labels: this.sortLabels(
          this.props.data.map(dataset => this.createLabels(dataset)).flat()
        ),
        datasets: this.props.data.map(dataset => this.createDataset(dataset))
      }
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default LineChart;
