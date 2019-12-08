import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MainPageLayout from "../../components/layout/MainPageLayout";
import TabsLayout from "../../components/layout/tabs/TabsLayout";
import MainTabsConfig from "./MainTabsConfig";
import { useParams } from "react-router";
import {
  setInventoryLoading,
  setInventoryData,
  setInventoryError
} from "../../actions/inventoryActions";
import axios from "axios";

class MainPage extends React.Component {
  componentDidMount() {
    this.props.setInventoryLoading(true);
    axios.get("/api/jasmin/stock").then(res => {
      this.props.setInventoryData(res.data);
      this.props.setInventoryLoading(false);
    });
  }

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
  inventory: PropTypes.array.isRequired,
  setInventoryData: PropTypes.func.isRequired,
  setInventoryLoading: PropTypes.func.isRequired,
  setInventoryError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  inventory: { ...state.inventory.inventory }
});

const mapDispatchToProps = {
  setInventoryLoading,
  setInventoryData,
  setInventoryError
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
