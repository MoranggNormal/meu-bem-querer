import useNewPetForm from '../../../hooks/useNewPetForm'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputAdornment from '@mui/material/InputAdornment';


export default function PetInfo() {

 const { handleChange, state } = useNewPetForm()

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
    <TextField
     id="petCity"
     name="petCity"
     label="Cidade"
     variant="standard"
     value={state.petCity}
     required
     fullWidth
     onChange={(e) => handleChange(e.target.name, e.target.value)}
    />
   </Grid>

   <Grid item xs={6}>
    <TextField
     id="petState"
     name="petState"
     label="Estado"
     variant="standard"
     value={state.petState}
     required
     fullWidth
     onChange={(e) => handleChange(e.target.name, e.target.value)}
    />
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