import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MainPageLayout from "../../components/layout/MainPageLayout";
import TabsLayout from "../../components/layout/tabs/TabsLayout";
import MainTabsConfig from "./MainTabsConfig";
import { useSelector } from "react-redux";
import { Switch, Redirect } from "react-router-dom";
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
  setSalesTopClients,
  setSalesClients,
  setSalesInvoices,
  setSalesTotal,
  setSalesTopSoldProducts,
  setSalesPerMonth,
  setSalesError
} from "../../actions/salesActions";

import axios from "axios";

class MainPage extends React.Component {
  componentDidMount() {
    this.getInventory();
    this.getPurchases();
    this.getSales();
  }

  render() {
    const value = this.props.match.params.view || "overview";
    // const { loggedIn } = useSelector(
    //   state => state.login
    // );
    return (
      <>
        {!this.props.loggedIn ? (
          <Switch>
            <Redirect to="/login" />
          </Switch>
        ) : (
          <MainPageLayout style>
            <TabsLayout
              style={{ backgroundColor: "yellow" }}
              value={value}
              options={MainTabsConfig()}
            />
          </MainPageLayout>
        )}
      </>
    );
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
      .get("/api/customer/topclient")
      .then(res => {
        this.props.setSalesTopClients(res.data);
        axios
          .get("/api/customer")
          .then(res => {
            this.props.setSalesClients(res.data);
            axios
              .get("/api/invoice")
              .then(res => {
                this.props.setSalesInvoices(res.data);
                axios
                  .get("/api/invoice/totalSales")
                  .then(res => {
                    this.props.setSalesTotal(res.data);
                    axios
                      .get("/api/product/topSoldProducts")
                      .then(res => {
                        this.props.setSalesTopSoldProducts(res.data);
                        axios
                          .get("/api/product/salesPerMonth")
                          .then(res => {
                            this.props.setSalesPerMonth(res.data);
                            this.props.setSalesLoading(false);
                          })
                          .catch(err => {
                            this.props.setSalesError(err);
                          });
                      })
                      .catch(err => {
                        this.props.setSalesError(err);
                      });
                  })
                  .catch(err => {
                    this.props.setSalesError(err);
                  });
              })
              .catch(err => {
                this.props.setSalesError(err);
              });
          })
          .catch(err => {
            this.props.setSalesError(err);
          });
      })
      .catch(err => {
        this.props.setSalesError(err);
      });
  };
}

MainPage.propTypes = {
  setInventoryData: PropTypes.func.isRequired,
  setInventoryLoading: PropTypes.func.isRequired,
  setInventoryError: PropTypes.func.isRequired,

  setPurchasesData: PropTypes.func.isRequired,
  setPurchasesLoading: PropTypes.func.isRequired,
  setPurchasesError: PropTypes.func.isRequired,

  setSalesTopClients: PropTypes.func.isRequired,
  setSalesClients: PropTypes.func.isRequired,
  setSalesInvoices: PropTypes.func.isRequired,
  setSalesTotal: PropTypes.func.isRequired,
  setSalesTopSoldProducts: PropTypes.func.isRequired,
  setSalesPerMonth: PropTypes.func.isRequired,
  setSalesLoading: PropTypes.func.isRequired,
  setSalesError: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    loggedIn: state.login.loggedIn
  };
};

const mapDispatchToProps = {
  setInventoryLoading,
  setInventoryData,
  setInventoryError,
  setPurchasesLoading,
  setPurchasesData,
  setPurchasesError,
  setSalesLoading,
  setSalesTopClients,
  setSalesClients,
  setSalesInvoices,
  setSalesTotal,
  setSalesTopSoldProducts,
  setSalesPerMonth,
  setSalesError
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
