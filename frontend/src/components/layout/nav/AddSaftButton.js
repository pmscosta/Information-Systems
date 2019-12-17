import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setSalesLoading,
  setSalesTopClients,
  setSalesClients,
  setSalesInvoices,
  setSalesTotal,
  setSalesTopSoldProducts,
  setSalesPerMonth,
  setSalesError
} from "../../../actions/salesActions";

class AddSaftButton extends React.Component {
  handleUploadFile = event => {
    for (let i = 0; i < event.target.files.length; i++) {
      const data = new FormData();
      data.append("xmlFile", event.target.files[i]);
      if (data) {
        axios
          .post("/api/saft", data)
          .then(this.updateSales())
          .catch(err => console.log(err));
      }
    }
  };

  updateSales = () => {
    this.props.setSalesLoading(true);
    setTimeout(this.getSales(), 2000);
  };

  getSales = () => {
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

  render = () => {
    return (
      <>
        <input
          style={{ display: "none" }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={this.handleUploadFile}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload SAF-T
          </Button>
        </label>
      </>
    );
  };
}

AddSaftButton.propTypes = {
  setSalesTopClients: PropTypes.func.isRequired,
  setSalesClients: PropTypes.func.isRequired,
  setSalesInvoices: PropTypes.func.isRequired,
  setSalesTotal: PropTypes.func.isRequired,
  setSalesTopSoldProducts: PropTypes.func.isRequired,
  setSalesPerMonth: PropTypes.func.isRequired,
  setSalesLoading: PropTypes.func.isRequired,
  setSalesError: PropTypes.func.isRequired
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  setSalesLoading,
  setSalesTopClients,
  setSalesClients,
  setSalesInvoices,
  setSalesTotal,
  setSalesTopSoldProducts,
  setSalesPerMonth,
  setSalesError
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSaftButton);
