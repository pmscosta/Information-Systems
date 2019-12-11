import { createMuiTheme } from "@material-ui/core/styles";

const getCssValue = key =>
  window.getComputedStyle(document.documentElement).getPropertyValue(key);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: getCssValue("--color-primary").trim() || "#333"
    },
    secondary: {
      main: getCssValue("--color-secondary").trim() || "#333"
    }
  }
});

export default theme;
