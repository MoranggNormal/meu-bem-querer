import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import FirstPage from "../components/FirstPage";

export default function Home() {
  const auth = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  return (
    <div>
      <Head>
        <title>Meu bem-querer | Página Inicial</title>
        <meta name="description" content="Meu bem-querer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FirstPage />
    </div>
  );
}
