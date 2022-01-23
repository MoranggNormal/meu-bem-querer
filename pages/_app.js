import "../styles/globals.css";
import {ThemeProvider} from "@mui/material/styles";
import {ProvideAuth} from "../hooks/useAuth";
import theme from "../utils/Theme";

import CssBaseline from "@mui/material/CssBaseline";



function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={theme}>
            <ProvideAuth>
                 <CssBaseline />
                <Component {...pageProps} />
            </ProvideAuth>
        </ThemeProvider>
    );
}

export default MyApp;
