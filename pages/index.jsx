import Head from "next/head";

import FirstPage from "../components/FirstPage";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Meu bem-querer | Página Inicial</title>
                <meta name="description" content="Meu bem-querer"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <FirstPage/>
        </div>
    );
}
