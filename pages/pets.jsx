import React from "react";
import RecipeReviewCard from "../components/Card/Card";
import Grid from "@mui/material/Grid";
import firebase from "firebase";
import { useAuth } from "../hooks/useAuth";
import Head from "next/head";
import { useEffect, useState } from "react";

const db = firebase.firestore();
const petRef = db.collection("pets");

const Pets = ({ data }) => {
  const auth = useAuth();

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
    <div>
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
                  dbId={dbId}
                  loading={loading}
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

let data = [];

export function getStaticProps() {
  try {
    petRef
      .where("pending", "==", false)
      .orderBy("upVote", "desc")
      .onSnapshot((querySnapshot) => {
        data = [];
        querySnapshot.forEach((doc) => {
          data.push({ dbId: doc.id, data: doc.data() });
        });
      });
  } catch (error) {
    console.log(error);
  } finally {
    return {
      props: { data },
    };
  }
}

export default Pets;
