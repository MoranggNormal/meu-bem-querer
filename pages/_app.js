import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { ProvideAuth } from "../hooks/useAuth";
import theme from "../utils/Theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ProvideAuth>
        <Component {...pageProps} />
      </ProvideAuth>
    </ThemeProvider>
  );
}

export default MyApp;
