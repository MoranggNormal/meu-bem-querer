/* eslint-disable @next/next/no-img-element */
import {useState} from 'react'
import useFirestoreQuery from "../../hooks/useFireStoreQuery";

import { fireStore } from "../../services/firebase";

import Grid from "@mui/material/Grid";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';



import WithTransition from '../../components/WithTransition/Index'

import upperFirstLetter from '../../utils/upperFirstLetter'

const Disponiveis = () => {

 const [onHover, setOnHover] = useState(null);

 const { data, status } = useFirestoreQuery(
  fireStore
   .collection("pets")
   .where("pending", "==", false)
   .orderBy("upVote", "desc")
 );
 
 const showInfo = (key) => {
  setOnHover(() => key)
 }

 

 return (
  <Grid container component="main">

   {status === 'loading' && <Grid item sx={{ width: '100%' }}>
    <LinearProgress />
   </Grid>}

   <Grid item xs={12} sx={{mt: 10}}>
    <Typography component="h1" variant="h5" fontWeight={600} align="center">
            Adoção
    </Typography>
    <Typography component="h2" variant="h4" align="center">
            Mostrando todas as mascotes disponíveis em nossa plataforma:
    </Typography>
   </Grid>

   {data && <ImageList variant="masonry" cols={3} gap={0}>
    {data.map(({petImg, petName, petCity, petState, upVote}, index) => (
     <ImageListItem key={petImg} onMouseOver={() => showInfo(index)} >
      <img
       src={`${petImg}?w=121&fit=crop&auto=format`}
       srcSet={`${petImg}?w=121&fit=crop&auto=format&dpr=2 2x`}
       alt={upperFirstLetter(petName)}
       loading="lazy"
      />

      {onHover === index && <WithTransition><ImageListItemBar
       title={upperFirstLetter(petName)}
       subtitle={`${upperFirstLetter(petCity)}, ${upperFirstLetter(petState)}`}
       actionIcon={
        <IconButton
         sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
         aria-label={`${upperFirstLetter(petName)} tem um total de ${upVote} apoios.`}
        >
         {upVote}
        </IconButton>
       }
      /></WithTransition>}

     </ImageListItem>
    ))}
   </ImageList>}

  </Grid>
 );
};

export default Disponiveis;
