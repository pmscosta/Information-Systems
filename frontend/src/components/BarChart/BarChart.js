import React, { useState, useEffect } from "react";
import Chart from "chart.js";

import "./BarChart.css";

const BarChart = props => {
  const [items, setItems] = useState(props.data);
  const [showQuantity, setToggle] = useState(true);
  const canvasRef = React.createRef();
  const [myChart, setMyChart] = useState("");

  const createDataset = () => {
    let data = [];
    Object.keys(items).forEach(key => {
      if (showQuantity) {
        data.push(items[key].quantity);
      } else {
        data.push(items[key].value);
      }
    });

    let label = showQuantity ? "Quantity (UN)" : "Value (EUR)";

    return {
      label,
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
  };

  const createLabels = () => {
    let labels = [];
    Object.keys(items).forEach(key => {
      labels.push(key);
    });

    return labels;
  };

  useEffect(() => {
    setMyChart(
      new Chart(canvasRef.current, {
        type: "horizontalBar",
        options: {
          showTooltips: false,
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
          labels: createLabels(),
          datasets: [createDataset()]
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showQuantity]);

  return (
    <div>
      <canvas ref={canvasRef} />
      <button type="button" onClick={() => setToggle(!showQuantity)}>
        Change
      </button>
    </div>
  );
};

export default BarChart;
