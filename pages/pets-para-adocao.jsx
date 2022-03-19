/* eslint-disable @next/next/no-img-element */
import {useState} from 'react'
import useFirestoreQuery from "../hooks/useFireStoreQuery";

import { fireStore } from "../services/firebase";

import Grid from "@mui/material/Grid";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';

import WithTransition from '../components/WithTransition/Index'
import sleep from '../utils/sleep'


const Pets = () => {

 const [onHover, setOnHover] = useState(null);


 const showInfo = (key) => {
  setOnHover(() => key)
 }
  
 const hideInfo = async () =>{ 
  await sleep(1000 * 15) // await 15 seconds before hide component 
  setOnHover(() => null)}

 const { data } = useFirestoreQuery(
  fireStore
   .collection("pets")
   .where("pending", "==", false)
   .orderBy("upVote", "desc")
 );

 return (
  <Grid container component="main">

   {data && <ImageList variant="masonry" cols={4} gap={0}>
    {data.map((item, index) => (
     <ImageListItem key={item.petImg} onMouseOver={() => showInfo(index)} onMouseOut={hideInfo}>
      <img
       src={`${item.petImg}?w=121&fit=crop&auto=format`}
       srcSet={`${item.petImg}?w=121&fit=crop&auto=format&dpr=2 2x`}
       alt={item.title}
       loading="lazy"
      />

      {onHover === index && <WithTransition><ImageListItemBar
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
      /></WithTransition>}

     </ImageListItem>
    ))}
   </ImageList>}

  </Grid>
 );
};

export default Pets;
