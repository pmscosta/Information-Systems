import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import ValueCard from "../../components/ValueCard";
import { useSelector } from "react-redux";
import SimpleCard from "../../components/cards/SimpleCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container } from "@material-ui/core";
import SimpleValueCard from "../../components/SimpleValueCard";
import AppLinearProgress from "../../components/AppLinearProgress";

class Finances extends React.Component {
  render() {
    return (
      <>
        <div>Accounts Payable: {this.props.accountsPayable}</div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    accountsPayable: state.purchases.invoiced
      .filter(({ naturalKey }) => {
        return !state.purchases.payments.find(x => x.sourceDoc === naturalKey);
      })
      .reduce((a, b) => a + b.payableAmount, 0)
      .toFixed(2)
  };
const Finances = () => {
  const { loading: iloading, inventory } = useSelector(
    state => state.inventory
  );
  const { loading: ploading, accountsPayable, all_purchases } = useSelector(
    state => state.purchases
  );
  const {
    loading: sloading,
    totalSales,
    loading,
    topClients,
    clients,
    invoices,
    topSoldProducts,
    salesPerMonth
  } = useSelector(state => state.sales);

  const [cogs, setCogs] = useState(0);

  useEffect(() => {
    // calculate COGS
    if (Array.isArray(all_purchases) && Array.isArray(invoices)) {
      const items = [];

      invoices.forEach(invoice => {
        invoice.prods.forEach(prod => {
          const bought = all_purchases.find(
            x => x.item.itemId === prod.productCode
          );

          if (bought !== null && bought !== undefined) {
            const idx = items.findIndex(x => x.itemId === bought.item.itemId);

            if (idx === -1) {
              items.push({
                itemId: bought.item.itemId,
                value: bought.item.value * prod.quantity,
                quantity: prod.quantity
              });
            } else {
              items[idx].value += bought.item.value * prod.quantity;
              items[idx].quantity += prod.quantity;
            }
          }
        });
      });

      let nom = 0;
      let den = 0;
      items.forEach(item => {
        nom += item.value * item.quantity;
        den += item.quantity;
      });

      const res = nom / den;

      setCogs(res);
    }
  }, [all_purchases, invoices]);

  return (
    <>
      {(loading || ploading || sloading) && <AppLinearProgress />}
      {!(loading || ploading || sloading) && (
        <Container>
          <SimpleValueCard name="Costs of goods sold" value={`${cogs} €`} />
          <SimpleValueCard
            name="Accounts payable"
            value={`${accountsPayable} €`}
          />
          <SimpleValueCard name="Net Margin" value={`${totalSales - cogs} €`} />
        </Container>
      )}
    </>
  );
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Finances);
