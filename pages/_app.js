import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { ProvideAuth } from "../hooks/useAuth";
import theme from "../utils/Theme";

import Header from "../components/Header/Header";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ProvideAuth>
      <Header />
        <Component {...pageProps} />
      </ProvideAuth>
    </ThemeProvider>
  );
}

export default MyApp;
