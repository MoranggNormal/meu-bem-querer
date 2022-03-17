import useNewPetForm from '../../../hooks/useNewPetForm'
import {Fragment} from 'react';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';



const readableValues = [
 'Nome',
 'Tipo',
 'Raça',
 'Peso',
 'Tamanho',
 'Genêro',
 'Idade',
 'Cidade',
 'Estado',
]

export default function Review() {

 const {state} = useNewPetForm();

 const stateValueAsArray = Object.values(state)

 return (
  <>
   <Typography variant="h6" gutterBottom>
        Order summary
   </Typography>
   
   <List disablePadding>
    {readableValues.map((item, index) => (
     <ListItem key={index} sx={{ py: 1, px: 0 }}>
      <ListItemText primary={item}  />
      <Typography variant="body2">{stateValueAsArray[index]}</Typography>
     </ListItem>
    ))}
   </List>

   <Divider sx={{my: 2}}/>

   <Typography variant="h6" gutterBottom>
        Descrição:
   </Typography>
   <Typography  gutterBottom>
    {state.petDescription}
   </Typography>

  </>
 );
}