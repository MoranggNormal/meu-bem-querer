import "../styles/globals.css";
import { DefaultSeo } from 'next-seo';
import { ProvideAuth } from "../hooks/useAuth";

import theme from "../utils/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from 'notistack';

import Header from "../components/Header/Header";
import WithTransition from '../components/WithTransition/Index'

function MyApp({ Component, pageProps, router }) {
 const url = `https://meubemquerer.vercel.app/${router.route}`

 return (
  <ThemeProvider theme={theme}>
   <SnackbarProvider maxSnack={5}>
    <ProvideAuth>
     <Header />
     <WithTransition>
      <DefaultSeo
       defaultTitle=  "Meu Bem-querer"
       titleTemplate= "%s - Meu Bem-querer"
       description=   "Doe e adote mascotes, um projeto desenvolvido pensando no próximo."
       canonical=     {url}
       openGraph={{
        url,
        type:        'website',
        locale:      'pt_BR',
        site_name:   'Meu Bem-querer | meubemquerer.vercel.app',
        description: 'Doe e adote mascotes, um projeto desenvolvido pensando no próximo.',
       }}
      />
      <Component {...pageProps} />
     </WithTransition>
    </ProvideAuth>
   </SnackbarProvider>
  </ThemeProvider>
 );
}

export default MyApp;
