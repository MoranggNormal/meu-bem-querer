import {useState, useEffect} from 'react';
import useNewPetForm from '../../../hooks/useNewPetForm'


import {getData} from '../../../services/statesAndCities'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function PetInfo() {

 const { handleChange, state } = useNewPetForm()

 const [states, setStates] = useState(null);
 const [cities, setCities] = useState(null)

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
   const data = await getData(`/city-by-state/${state.petState}`)
  
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
  
  if(state.petState){
   getCities()
  }
  
 }, [state.petState])

 return (
  <Grid container spacing={3}>

   <Grid item xs={12}>
    <TextField
     id="petName"
     name="petName"
     label="Nome do pet"
     type="text"
     variant="standard"
     value={state.petName}
     required
     fullWidth
     autoFocus
     onChange={(e) => handleChange(e.target.name, e.target.value)}
    />
   </Grid>

   <Grid item xs={12} sm={6}>
    <TextField
     id="petType"
     name="petType"
     label="Tipo"
     type="text"
     variant="standard"
     value={state.petType}
     required
     fullWidth
     onChange={(e) => handleChange(e.target.name, e.target.value)}
    />
   </Grid>

   <Grid item xs={12} sm={6}>
    <TextField
     id="petRace"
     name="petRace"
     label="Raça"
     type="text"
     variant="standard"
     value={state.petRace}
     required
     fullWidth
     onChange={(e) => handleChange(e.target.name, e.target.value)}
    />
   </Grid>

   <Grid item xs={6}>
    <TextField
     id="petWeight"
     name="petWeight"
     label="Peso"
     type="number"
     value={state.petWeight}
     fullWidth
     variant="standard"
     InputProps={{
      startAdornment: <InputAdornment position="start">kg</InputAdornment>,
     }}
     onChange={(e) => handleChange(e.target.name, e.target.value)}
    />
   </Grid>
   
   <Grid item xs={6}>
    <TextField
     id="petSize"
     name="petSize"
     label="Tamanho"
     type="number"
     variant="standard"
     value={state.petSize}
     required
     fullWidth
     InputProps={{
      startAdornment: <InputAdornment position="start">cm</InputAdornment>,
     }}
     onChange={(e) => handleChange(e.target.name, e.target.value)}
    />
   </Grid>

   <Grid item xs={6}>
    <FormControl fullWidth required variant="standard">
     <InputLabel id="states">Estado</InputLabel>
     <Select
      labelId="states"
      id="statesInput"
      name="petState"
      value={state.petState}
      onChange={(e) => handleChange(e.target.name, e.target.value)}
      fullWidth
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
   </Grid>

   <Grid item xs={6}>
    <FormControl fullWidth required variant="standard">
     <InputLabel id="cities">Cidade</InputLabel>
     <Select
      labelId="cities"
      id="citiesInput"
      name="petCity"
      onChange={(e) => handleChange(e.target.name, e.target.value)}
      value={state.petCity}
      label="Cidade"
      disabled={!state.petState}
     >
      <MenuItem value="">
       <em>Limpar</em>
      </MenuItem>
      {cities && cities.map((item) => (
       <MenuItem key={item.toString()} value={item.toString()}>{item.toString()}</MenuItem>
      ))}
     </Select>
    </FormControl>

   </Grid>

   <Grid item xs={12} md={6}>
    <FormControlLabel
     required
     control={<Checkbox color="secondary" name="isPetDeficient" checked={state.isPetDeficient} onChange={(e) => handleChange(e.target.name, e.target.checked)}/>}
     label="O Pet possui alguma deficiência"
    />
   </Grid>

   <Grid item xs={12} md={6}>
    <FormControlLabel
     control={<Checkbox color="secondary" name="isPetSick" checked={state.isPetSick}  onChange={(e) => handleChange(e.target.name, e.target.checked)} />}
     label="O Pet possui alguma doença"
    />
   </Grid>

   <Grid item xs={6}>
    <FormControl>
     <FormLabel id="petGender">Gênero</FormLabel>
     <RadioGroup
      aria-labelledby="petGender"
      name="petGender"
      value={state.petGender}
      onChange={(e) => handleChange(e.target.name, e.target.value)}
     >
      <FormControlLabel value="Fêmea" control={<Radio />} label="Fêmea" />
      <FormControlLabel value="Macho" control={<Radio />} label="Macho" />
     </RadioGroup>
    </FormControl>
   </Grid>
    
   <Grid item xs={6}>
    <FormControl>
     <FormLabel id="petAge">Idade</FormLabel>
     <RadioGroup
      aria-labelledby="petAge"
      name="petAge"
      value={state.petAge}
      onChange={(e) => handleChange(e.target.name, e.target.value)}
     >
      <FormControlLabel value="Filhote" control={<Radio />} label="Filhote" />
      <FormControlLabel value="Adulto(a)" control={<Radio />} label="Adulto(a)" />
      <FormControlLabel value="Idoso(a)" control={<Radio />} label="Idoso(a)" />
     </RadioGroup>
    </FormControl>
   </Grid>
  </Grid>
 );
}