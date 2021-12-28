import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { pink, red, deepOrange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[300],
      light: pink[300],
      contrastText: "#fff",
    },
    secondary: {
      main: red[400],
      light: red[300],
      contrastText: "#fff",
    },
  },
});

export default theme;
