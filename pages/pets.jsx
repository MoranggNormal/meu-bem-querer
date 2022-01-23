import React, { useEffect, useState } from "react";

import nookies from "nookies";
import firebase from "../services/firebase";
import { verifyToken } from "../services/firebaseAdmin";

import Grid from "@mui/material/Grid";
import Header from "../components/Header/Header";
import RecipeReviewCard from "../components/Card/Card";

const db = firebase.firestore();
const petRef = db.collection("pets");

const Pets = ({ data, storedUser }) => {
  const db = firebase.firestore();
  const petRef = db.collection("pets");

  const [petData, setPetData] = useState([]);
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
        setPetData(list);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header storedUser={storedUser} />

      <Grid container component="section">
        {data &&
          petData.map(({ dbId, data }) => {
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
                  petRace={data.petRace}
                  petCity={data.petCity}
                  petState={data.petState}
                  upVote={data.upVote}
                  upVotes={data.upVotes}
                  petUid={data.petUid}
                  dbId={dbId}
                  loading={loading}
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    let data = [];

    const { "mb-token": cookies } = nookies.get(context);
    const token = await verifyToken(cookies);

    petRef
      .where("pending", "==", false)
      .orderBy("upVote", "desc")
      .onSnapshot((querySnapshot) => {
        data = [];
        querySnapshot.forEach((doc) => {
          data.push({ dbId: doc.id, data: doc.data() });
        });
      });

    return {
      props: { data: data, storedUser: token },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { err: error },
    };
  }
}

export default Pets;
