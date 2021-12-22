import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import firebase from "firebase";
import Header from "../components/Header/Header";
import RecipeReviewCard from "../components/Card/Card";
import Grid from "@mui/material/Grid";

export default function Home() {
  const auth = useAuth();

  const db = firebase.firestore();
  const petRef = db.collection("pets");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    petRef
      .where("pending", "==", false)
      .orderBy("upVote", "desc")
      .onSnapshot((querySnapshot) => {
        let list = [];
        querySnapshot.forEach((doc) => {
          list.push({ dbId: doc.id, data: doc.data() });
        });
        setData(list);
        setTimeout(() => setLoading(false), 2000);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Meu bem-querer | Página Inicial</title>
        <meta name="description" content="Meu bem-querer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header loading={loading} />

      <Grid container component="section">
        {data &&
          data.map(({ dbId, data }) => {
            return (
              <Grid item key={data.petUid} xs={12} sm={6} md={4} lg={3}>
                <RecipeReviewCard
                  petName={data.petName}
                  added={data.added}
                  authorName={data.authorName}
                  authorPhoto={data.authorPhoto}
                  petDescription={data.petDescription}
                  petImg={data.petImg}
                  petSituation={data.petSituation}
                  petCity={data.petCity}
                  petState={data.petState}
                  loading={data.loading}
                  upVote={data.upVote}
                  upVotes={data.upVotes}
                  dbId={dbId}
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}
