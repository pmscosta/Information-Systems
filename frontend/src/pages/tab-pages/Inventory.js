import React from "react";
import { getItems } from "../../services/StockService";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    getItems().then(items => this.setState({ items }));
  }

  render() {
    return (
      <div>
        {this.state.items.map(item => {
          return (
            <div key={item.itemKey}>
              <span>
                {item.description}
                {"\t"}
                {item.itemKey}
              </span>
              {item.warehouses.map(wh => {
                if (wh.stockBalance !== 0)
                  return (
                    <div>
                      In warehouse:
                      <li>{wh.balanceAmount}</li>
                      <li>{wh.stockBalance}</li>
                      <li>{wh.unitAmount}</li>
                    </div>
                  );
                return "";
              })}
            </div>
          );
        })}
      </div>
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

export default Inventory;
