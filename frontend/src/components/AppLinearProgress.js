import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

const AppLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#4717F6"
  },
  barColorPrimary: {
    backgroundColor: "#A239CA"
  }
})(LinearProgress);

export default AppLinearProgress;
