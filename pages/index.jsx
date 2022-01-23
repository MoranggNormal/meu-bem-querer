import Head from "next/head";
import Header from "../components/Header/Header";
import IndexCarroussel from "../components/IndexCarroussel/IndexCarroussel";

import nookies from "nookies";
import { verifyToken } from "../services/firebaseAdmin";

export default function Home({ storedUser }) {
  return (
    <>
      <Head>
        <title>Meu bem-querer | Página Inicial</title>
        <meta name="description" content="Meu bem-querer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header storedUser={storedUser} />

      <IndexCarroussel />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { "mb-token": cookies } = nookies.get(context);

    const token = await verifyToken(cookies);

    const { email } = token;

    return {
      props: {
        storedUser: token,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      props: { nada: "" },
    };
  }
}
