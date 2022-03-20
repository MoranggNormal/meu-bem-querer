/* eslint-disable @next/next/no-img-element */
import {useState, useEffect} from 'react'
import useFirestoreQuery from "../hooks/useFireStoreQuery";

import { fireStore } from "../services/firebase";
import { getData } from '../services/statesAndCities'

import Grid from "@mui/material/Grid";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import WithTransition from '../components/WithTransition/Index'

import upperFirstLetter from '../utils/upperFirstLetter'

const Pets = () => {

 const [onHover, setOnHover] = useState(null);
 const [selectedState, setSelectedState] = useState('');
 const [selectedCity, setSelectedCity] = useState('');

 const [states, setStates] = useState(null);
 const [cities, setCities] = useState(null)


 const { data, status } = useFirestoreQuery(
  fireStore
   .collection("pets")
   .where("pending", "==", false)
   .orderBy("upVote", "desc")
 );
 
 const showInfo = (key) => {
  setOnHover(() => key)
 }

 const handleChange = ({target}) => {
  const {name, value} = target

  if(name === 'statesInput'){
   setSelectedState(value);

   // If state value is null, set city to null too.
   if(value === ''){
    setSelectedCity('')
    return
   }

  }
  if(name === 'citiesInput'){
   setSelectedCity(value)
  }
 };


 // Get Brazil States when mounted.
 useEffect(() => {
  const getStates = async () => {
   const data = await getData('/states')

   setStates(() => data)
  }
  
  getStates()

 }, [])

 // Get cities based on selected state
 useEffect(() => {
  const getCities = async () => {
   const data = await getData(`/city-by-state/${selectedState}`)

   // Split into multiple arrays.
   function splitArrayIntoChunksOfLen(arr, len) {
    const chunks = [], i = 0, n = arr.length;
    while (i < n) {
     chunks.push(arr.slice(i, i += len));
    }
    return chunks;
   }

   const splitedData = splitArrayIntoChunksOfLen(data[0], 1);

   setCities(() => splitedData)
  }

  if(selectedState){
   getCities()
  }

 }, [selectedState])

 useEffect(() => {
  console.log(selectedCity)
 }, [selectedCity])
 
 
 
 

 return (
  <Grid container component="main">

   {status === 'loading' && <Grid item sx={{ width: '100%' }}>
    <LinearProgress />
   </Grid>}

   <Grid item xs={12} sx={{minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <FormControl sx={{ m: 1, minWidth: 120 }}>
     <InputLabel id="states">Estado</InputLabel>
     <Select
      labelId="states"
      id="statesInput"
      name="statesInput"
      value={selectedState}
      onChange={handleChange}
      autoWidth
      label="Estado"
     >
      <MenuItem value="">
       <em>Limpar</em>
      </MenuItem>
      {states && states.map(({sigla, nome}) => (
       <MenuItem key={sigla} value={sigla}>{nome}</MenuItem>
      ))}
     </Select>
    </FormControl>

    <FormControl sx={{ minWidth: 220 }}>
     <InputLabel id="cities">Cidade</InputLabel>
     <Select
      labelId="cities"
      id="citiesInput"
      name="citiesInput"
      onChange={handleChange}
      value={selectedCity}
      autoWidth
      label="Cidade"
      disabled={!selectedState}
     >
      <MenuItem value="">
       <em>Limpar</em>
      </MenuItem>
      {cities && cities.map((item) => (
       <MenuItem key={item} value={item}>{item}</MenuItem>
      ))}
     </Select>
    </FormControl>
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

export default Pets;
