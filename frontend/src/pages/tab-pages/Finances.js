import React from "react";
import LineChart from "../../components/LineChart/LineChart";
import IconCard from "../../components/cards/IconCard";
import PaymentIcon from '@material-ui/icons/Payment';
import Grid from '@material-ui/core/Grid';

import LocalAtmIcon from '@material-ui/icons/LocalAtm';

const Finances = () => {
  return <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"

  >
    <IconCard icon={PaymentIcon} value="123" color="primary" outline="red" name="ACCOUNTS PAYABLE" />
    <IconCard icon={LocalAtmIcon} value="254" color="primary" outline="green" name="ACCOUNTS RECEIVABLE" />
    {/* <LineChart data={[]} /> */}
  </Grid>;
};

export default Finances;
