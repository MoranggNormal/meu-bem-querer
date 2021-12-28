import Head from "next/head";
import DemoCarousel from "../components/Carroussel";

export default function Home() {
  return (
    <>
      <Head>
        <title>Meu bem-querer | Página Inicial</title>
        <meta name="description" content="Meu bem-querer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DemoCarousel />
    </>
  );
}
