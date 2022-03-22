/* eslint-disable @next/next/no-img-element */
import {useState, useEffect, useReducer} from 'react'
import useFirestoreQuery from "../../hooks/useFireStoreQuery";

import { fireStore } from "../../services/firebase";
import { getData } from '../../services/statesAndCities'

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
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


import WithTransition from '../../components/WithTransition/Index'

import upperFirstLetter from '../../utils/upperFirstLetter'

const formReducer = (state, action) => {
 switch (action.type) {
 case "initial":
  return { current: "initial" };
 case "localization":
  return { current: "localization" };
 case "gender":
  return { current: 'gender'}
 default:
  return { current: "initial"};
 }
}

const showCurrentText = (ref) => {
 switch (ref) {
 case 'initial':
  return 'Para prosseguir, selecione um filtro...'
 case 'localization':
  return 'Filtrando por localização...'      
 case 'gender':
  return 'Filtrando por gênero...'          
 default:
  break;
 }
}

const Pets = () => {

 const [onHover, setOnHover] = useState(null);
 const [selectedState, setSelectedState] = useState('');
 const [selectedCity, setSelectedCity] = useState('');
 const [selectedForm, setSelectedForm] = useState('');
 const [stateAcronym, setStateAcronym] = useState('');
 const [forceUpdate, setForceUpdate] = useState(false)
 const [states, setStates] = useState('');
 const [cities, setCities] = useState([]);

 const formHandlers = {
  current: 'initial',
 }

 const [activeForm, dispatch] = useReducer(formReducer, formHandlers)
 

 const { data, status } = useFirestoreQuery(
  fireStore
   .collection("pets")
   .where("pending", "==", false)
   .orderBy("upVote", "desc")
   .limit(5)
 );
 
 const showInfo = (key) => {
  setOnHover(() => key)
 }

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
   const data = await getData(`/city-by-state/${stateAcronym}`)
      
   setCities(() => data[0])
  }
      
  if(selectedState){
   getCities()
  }
      
 }, [stateAcronym])

 useEffect(() => {
  if(!states) return
  const getAcronym = states.filter((item) => item.label === selectedState )

  if(!getAcronym.length) return
      
  setStateAcronym(() => getAcronym[0].sigla)
 }, [selectedState])
 

 return (
  <Grid container component="main">

   {status === 'loading' && 
   <WithTransition>
    <Grid item sx={{ width: '100%' }}>
     <LinearProgress />
    </Grid>
   </WithTransition>}

   <Grid item xs={12} sx={{mx: 2, mt: 4, mb: 2, opacity: activeForm.current != 'initial' && 0}}>
    <Typography component="h1" variant="h5" fontWeight={700}>
        ADOÇÃO
    </Typography>
   </Grid>

   <Grid item xs={4} sx={{mx: 2, opacity: activeForm.current != 'initial' && 0}}>
    <Divider />
   </Grid>

   {activeForm.current != 'initial' && 
    <Grid item xs={12} sx={{mx: 2, mt: 4, mb: 2, position: 'absolute'}}>
     <WithTransition >
      <Button onClick={() => dispatch({type: 'initial'})} variant="contained" sx={{height: '100%'}}>Voltar</Button>
     </WithTransition>
    </Grid>
   }

   <Grid item xs={12} sx={{mt: 10}}>
    <Typography component="h2" variant="h5" align="center">
     {showCurrentText(activeForm.current)}
    </Typography>
   </Grid>

   {activeForm.current === 'initial' &&
<WithTransition>
 <Grid container sx={{mt: 5, mb: 10}} spacing={1} justifyContent="center">
  <Grid item>
   <FormControl sx={{ minWidth: 300}}>
    <InputLabel id="demo-simple-select-label">Escolha entre:</InputLabel>
    <Select
     labelId="demo-simple-select-label"
     id="demo-simple-select"
     label="Escolha entre..."
     value={selectedForm}
     onChange={(e) => setSelectedForm(e.target.value)}
    >
     <MenuItem value={'localization'}>Localização</MenuItem>
     <MenuItem value={'gender'}>Gênero</MenuItem>
    </Select>
   </FormControl>
  </Grid>
    
  <Grid item>
   <Button onClick={() => dispatch({type: selectedForm})} variant="contained" sx={{height: '100%'}}>Avançar</Button>
  </Grid>
 </Grid>
</WithTransition>
   }
   

   {activeForm.current === "localization" && states &&
   <WithTransition>
    <Grid container spacing={1} justifyContent="center" sx={{mt: 5, mb: 10}}> 

     <Grid item xs={10} sm={4} md={3} lg={4}>
      <Autocomplete
       inputValue={selectedState}
       onInputChange={(event, newInputValue) => {
       // Clear cities before update.
        setCities([])
        setSelectedCity('')
        setForceUpdate(prevState => !prevState)
        // Update.
        setSelectedState(newInputValue);
       }}
       disablePortal
       id="states"
       options={states}
       renderInput={(params) =><TextField
        {...params}
        label="Busque por um estado"
        InputProps={{
         ...params.InputProps,
        }}
       />}
      /> 
     </Grid>

     <Grid item xs={10} sm={5} md={4} lg={5}>
      <Autocomplete
       key={forceUpdate}
       inputValue={selectedCity}
       onInputChange={(event, newInputValue) => {
        setSelectedCity(newInputValue)      
       }}
       disablePortal
       id="cities"
       options={cities}
       isOptionEqualToValue={(option, value) => option !== value}
       disabled={!selectedState}
       renderInput={(params) =><TextField
        {...params}
        label="Selecione uma cidade"
       />}
      /> 
     </Grid>
    
     <Grid item xs={12} sm={2} lg={1} sx={{justifyContent: {xs: "center", md: "left"}, display: 'flex'}}>
      <Button variant="contained" sx={{height: '100%'}}>Confirmar</Button>
     </Grid>
    </Grid>
   </WithTransition>
   }

   {activeForm.current === "gender" && states &&
   <WithTransition>
    <Grid container spacing={1} justifyContent="center" sx={{mt: 5, mb: 10}}> 

     <Grid item xs={10} sm={4} md={3} lg={4}>
      <Autocomplete
       inputValue={selectedState}
       onInputChange={(event, newInputValue) => {
       // Clear cities before update.
        setCities([])
        setSelectedCity('')
        setForceUpdate(prevState => !prevState)
        // Update.
        setSelectedState(newInputValue);
       }}
       disablePortal
       id="states"
       options={states}
       renderInput={(params) =><TextField
        {...params}
        label="Busque por um estado"
        InputProps={{
         ...params.InputProps,
        }}
       />}
      /> 
     </Grid>
    
     <Grid item xs={12} sm={2} lg={1} sx={{justifyContent: {xs: "center", md: "left"}, display: 'flex'}}>
      <Button variant="contained" sx={{height: '100%'}}>Confirmar</Button>
     </Grid>
    </Grid>
   </WithTransition>
   }

   <Grid item xs={12} sx={{mx: 3, mt: '45vh'}}>
    <Divider />
   </Grid>

   <Grid item xs={12} sx={{mt: 10}}>
    <Typography component="h3" variant="h4" align="center">
            Conheça os cinco pets mais apoiados pelos usuários:
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

export default Pets;
