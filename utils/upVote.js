import { fireStore } from "../services/firebase";

const petRef = fireStore.collection("pets");

const onUpVote = (auth, upVote, dbId, upVotes) => {
 if (!auth.user) return;

 if (upVotes.includes(auth.user.uid)) {
  petRef.doc(dbId).update({
   upVote: (upVote -= 1),
   upVotes: upVotes.filter((e) => e != auth.user.uid),
  });
 } else {
  petRef.doc(dbId).update({
   upVote: (upVote += 1),
   upVotes: [...upVotes, auth.user.uid],
  });
 }
};

export default onUpVote;
