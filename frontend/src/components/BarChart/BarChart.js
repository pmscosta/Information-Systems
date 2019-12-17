import React, { useState, useEffect } from "react";
import Chart from "chart.js";

import "./BarChart.css";
import { Button } from "@material-ui/core";
import UpdateOutlinedIcon from "@material-ui/icons/UpdateOutlined";

const BarChart = props => {
  const [items] = useState(props.data);
  const [togglable] = useState(props.togglable);
  const [showQuantity, setToggle] = useState(true && togglable);
  const canvasRef = React.createRef();
  const [myChart, setMyChart] = useState("");

  const createDataset = () => {
    let data = [];
    items.forEach(item => {
      if (togglable && showQuantity) {
        data.push(item.quantity);
      } else {
        data.push(item.value);
      }
    });

    let label = showQuantity ? "Quantity (UN)" : "Value (EUR)";

    return {
      barPercentage: 0.4,
      label,
      backgroundColor: ["#FF555E", "#FF8650", "#83B2FF", "#FFE981", "#8BF18B"],
      data
    };
  };

  const createLabels = () => {
    let labels = [];
    items.forEach(item => {
      labels.push(item.key);
    });

    return labels;
  };

  useEffect(() => {
    setMyChart(
      new Chart(canvasRef.current, {
        type: "horizontalBar",
        options: {
          legend: {
            position: "top"
          },
          elements: {
            rectangle: {
              borderWidth: 0.2
            }
          },
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
          responsive: true
        },
        data: {
          labels: createLabels(),
          datasets: [createDataset()]
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, showQuantity]);

  return (
    <div className="inner-graph">
      <canvas ref={canvasRef} />
      {togglable && (
        <Button
          variant="outlined"
          endIcon={<UpdateOutlinedIcon>change</UpdateOutlinedIcon>}
          onClick={() => setToggle(!showQuantity)}
        >
          Toggle data
        </Button>
      )}
    </div>
  );
};

export default React.memo(BarChart);
