import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { ProvideAuth } from "../hooks/useAuth";
import theme from "../utils/Theme";
import { motion, AnimatePresence } from "framer-motion";
import { SnackbarProvider } from 'notistack';


import CssBaseline from "@mui/material/CssBaseline";

import Header from "../components/Header/Header";

function MyApp({ Component, pageProps, router }) {
 return (
  <ThemeProvider theme={theme}>
   <SnackbarProvider maxSnack={5}>
    <ProvideAuth>
     <CssBaseline />
     <Header />

     <AnimatePresence>
      <motion.div
       key={router.route}
       initial="initial"
       animate="animate"
       transition={{ delay: 0.2 }}
       variants={{
        initial: {
         opacity: 0,
        },
        animate: {
         opacity: 1,
        },
       }}
      >
       <Component {...pageProps} />
      </motion.div>
     </AnimatePresence>
    </ProvideAuth>
   </SnackbarProvider>
  </ThemeProvider>
 );
}

export default MyApp;
