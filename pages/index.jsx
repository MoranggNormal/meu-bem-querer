import Head from 'next/head'
import { useEffect } from 'react'
import { app } from '../services/firebase'

export default function Home() {


  useEffect(() => {
    console.log(app)
  }, [])

  return (
    <div>
      <Head>
        <title>Meu bem-querer | Página Inicial</title>
        <meta name="description" content="Meu bem-querer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


    </div>
  )
}
