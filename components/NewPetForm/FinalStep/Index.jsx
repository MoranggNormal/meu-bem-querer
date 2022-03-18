import {useState, useEffect} from 'react';
import useNewPetForm from '../../../hooks/useNewPetForm'

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';



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
 const [imageAsLink, setImageAsLink] = useState("");
 
 const stateValueAsArray = Object.values(state)

 useEffect(() => {
  if(state.petImage){
   const {petImage} = state
   const _imageAsLink = URL.createObjectURL(petImage)
   setImageAsLink(() => _imageAsLink);
  }
 }, [state])

 return (
  <>
   <Typography variant="h6" gutterBottom>
        Revise as informações
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

   <Divider sx={{my: 2}}/>

   {imageAsLink && 
    <>
     <Typography variant="h6" gutterBottom>
            Imagem do Pet:
     </Typography>

     <Card>
      <CardMedia
       component="img"
       image={imageAsLink}
       alt="green iguana"
      />
     </Card>
    </>}

  </>
 );
}