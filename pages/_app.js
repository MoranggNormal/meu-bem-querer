import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { ProvideAuth } from "../hooks/useAuth";
import theme from "../utils/Theme";
import WithTransition from '../components/WithTransition/Index'
import { SnackbarProvider } from 'notistack';


import CssBaseline from "@mui/material/CssBaseline";

import Header from "../components/Header/Header";

function MyApp({ Component, pageProps }) {
 return (
  <ThemeProvider theme={theme}>
   <SnackbarProvider maxSnack={5}>
    <ProvideAuth>
     <CssBaseline />
     <Header />
     <WithTransition>
      <Component {...pageProps} />
     </WithTransition>
    </ProvideAuth>
   </SnackbarProvider>
  </ThemeProvider>
 );
}

export default MyApp;
