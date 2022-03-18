/* eslint-disable @next/next/no-img-element */
import useFirestoreQuery from "../hooks/useFireStoreQuery";

import { fireStore } from "../services/firebase";

import Grid from "@mui/material/Grid";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';

const Pets = () => {

 const { data } = useFirestoreQuery(
  fireStore
   .collection("pets")
   .where("pending", "==", false)
   .orderBy("upVote", "desc")
 );

 return (
  <div>
   <Grid container component="main">

    <ImageList variant="masonry" cols={3} gap={2}>
     {data && data.map((item) => (
      <ImageListItem key={item.petImg}>
       <img
        src={`${item.petImg}?w=161&fit=crop&auto=format`}
        srcSet={`${item.petImg}?w=161&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
       />
       <ImageListItemBar
        title={item.petName}
        subtitle={`${item.petCity},${item.petState}`}
        actionIcon={
         <IconButton
          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
          aria-label={`${item.petName} tem um total de ${item.upVote} apoios.`}
         >
          {item.upVote}
         </IconButton>
        }
       />
      </ImageListItem>
     ))}
    </ImageList>

   </Grid>
  </div>
 );
};

export default Pets;
