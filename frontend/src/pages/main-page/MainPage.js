import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MainPageLayout from "../../components/layout/MainPageLayout";
import TabsLayout from "../../components/layout/tabs/TabsLayout";
import MainTabsConfig from "./MainTabsConfig";
import {
  setInventoryLoading,
  setInventoryData,
  setInventoryError
} from "../../actions/inventoryActions";
import {
  setPurchasesLoading,
  setPurchasesData,
  setPurchasesError
} from "../../actions/purchasesActions";
import {
  setSalesLoading,
  setSalesData,
  setSalesError
} from "../../actions/salesActions";

import axios from "axios";

class MainPage extends React.Component {
  componentDidMount() {
    this.getInventory();
    this.getPurchases();
    // this.getSales();
  }

  getInventory = () => {
    this.props.setInventoryLoading(true);
    axios
      .get("/api/jasmin/stock")
      .then(res => {
        this.props.setInventoryData(
          res.data,
          this.props.setInventoryLoading(false)
        );
      })
      .catch(err => {
        this.props.setInventoryError(err);
        this.props.setInventoryLoading(false);
      });
  };

  getPurchases = () => {
    this.props.setPurchasesLoading(true);
    axios
      .get("/api/jasmin/purchases")
      .then(res => {
        this.props.setPurchasesData(res.data);
        console.log("hey");
        this.props.setPurchasesLoading(false);
      })
      .catch(err => {
        this.props.setPurchasesError(err);
        this.props.setPurchasesLoading(false);
      });
  };

  getSales = () => {
    this.props.setSalesLoading(true);
    axios
      .get("/api/jasmin/sales")
      .then(res => {
        this.props.setSalesData(res.data);
        this.props.setSalesLoading(false);
      })
      .catch(err => {
        this.props.setSalesError(err);
        this.props.setPurchasesLoading(false);
      });
  };

  render() {
    const value = this.props.match.params.view || "overview";
    return (
      <MainPageLayout style>
        <TabsLayout
          style={{ backgroundColor: "yellow" }}
          value={value}
          options={MainTabsConfig()}
        />
      </MainPageLayout>
    );
  }
}

MainPage.propTypes = {
  inventory: PropTypes.object.isRequired,
  setInventoryData: PropTypes.func.isRequired,
  setInventoryLoading: PropTypes.func.isRequired,
  setInventoryError: PropTypes.func.isRequired,

  purchases: PropTypes.object.isRequired,
  setPurchasesData: PropTypes.func.isRequired,
  setPurchasesLoading: PropTypes.func.isRequired,
  setPurchasesError: PropTypes.func.isRequired,

  sales: PropTypes.object.isRequired,
  setSalesData: PropTypes.func.isRequired,
  setSalesLoading: PropTypes.func.isRequired,
  setSalesError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  inventory: { ...state.inventory.inventory },
  purchases: { ...state.purchases.purchases },
  sales: { ...state.sales.sales }
});

const mapDispatchToProps = {
  setInventoryLoading,
  setInventoryData,
  setInventoryError,
  setPurchasesLoading,
  setPurchasesData,
  setPurchasesError,
  setSalesLoading,
  setSalesData,
  setSalesError
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
