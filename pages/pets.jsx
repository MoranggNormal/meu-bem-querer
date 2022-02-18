import { useAuth } from "../hooks/useAuth";
import useFirestoreQuery from "../hooks/useFireStoreQuery";

import { fireStore } from "../services/firebase";

import onUpVote from "../utils/upVote";

import RecipeReviewCard from "../components/Card/Card";
import Grid from "@mui/material/Grid";

const Pets = () => {
 const auth = useAuth();

 const { data, status } = useFirestoreQuery(
  fireStore
   .collection("pets")
   .where("pending", "==", false)
   .orderBy("upVote", "desc")
 );

 return (
  <div>
   <Grid container component="section">
    {data &&
          data.map(
           ({
            dbId,
            petUid,
            petName,
            added,
            authorName,
            authorPhoto,
            petDescription,
            petImg,
            petSituation,
            petRace,
            petCity,
            petState,
            upVote,
            upVotes,
           }) => {
            return (
             <Grid item key={petUid} xs={12} sm={6} md={4} lg={3}>
              <RecipeReviewCard
               petName={petName}
               added={added}
               authorName={authorName}
               authorPhoto={authorPhoto}
               petDescription={petDescription}
               petImg={petImg}
               petSituation={petSituation}
               petRace={petRace}
               petCity={petCity}
               petState={petState}
               upVote={upVote}
               upVotes={upVotes}
               petUid={petUid}
               dbId={dbId}
               onUpVote={onUpVote}
               status={status}
               auth={auth}
              />
             </Grid>
            );
           }
          )}
   </Grid>
  </div>
 );
};

export default Pets;
