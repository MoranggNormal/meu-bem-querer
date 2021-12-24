import React from "react";
import RecipeReviewCard from "../components/Card/Card";
import Grid from "@mui/material/Grid";
import firebase from "firebase";
import { useAuth } from "../hooks/useAuth";

const db = firebase.firestore();
const petRef = db.collection("pets");
let data = [];

export async function getStaticProps() {
  petRef
    .where("pending", "==", false)
    .orderBy("upVote", "desc")
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({ dbId: doc.id, data: doc.data() });
      });
    });

  return {
    props: { data },
  };
}

const Pets = ({ data }) => {
  return (
    <div>
      <Grid container component="section">
        <Grid item xs={12}>
          Olá
        </Grid>
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
                  petRace={data.petRace}
                  petCity={data.petCity}
                  petState={data.petState}
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
};

export default Pets;
