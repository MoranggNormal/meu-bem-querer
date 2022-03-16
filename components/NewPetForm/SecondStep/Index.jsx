import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import useNewPetForm from '../../../hooks/useNewPetForm'
import { useState } from 'react';

export default function PetDesc() {

 const { handleChange, state } = useNewPetForm()

 const maxCharacters = 1000

 const [countedCharacters, setCountedCharacters] = useState(maxCharacters);

 const setCharacters = (e) => {
  setCountedCharacters(() => maxCharacters - e.target.value.length)
  handleChange(e.target.name, e.target.value)
 }


 return (
  <>
   <Typography variant="h6" gutterBottom>
        Adorariamos saber um pouco mais sobre o pet, coisas como sobre o seu comportamento e motivo da doação...
   </Typography>

   <Grid container spacing={3}>
    <Grid item xs={12}>
     <TextField
      id="petDescription"
      name="petDescription"
      label={`"Escreva aqui em até ${maxCharacters} caracteres"`}
      defaultValue={state.petDescription}
      multiline
      fullWidth
      autoFocus
      rows={6}
      inputProps={{ maxLength: maxCharacters }}
      onChange={setCharacters}
     />
    </Grid>
    <Grid item xs={12} sx={{display: 'flex', alignItems: 'flex-start', gap: '0.3em'}}>
     <InfoOutlinedIcon />
     <Typography variant="small" gutterBottom>
      {countedCharacters} caracteres restantes.
     </Typography>
    </Grid>
   </Grid>
  </>
 );
}