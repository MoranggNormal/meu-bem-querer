import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from "@mui/material/styles";

import useNewPetForm from '../../../hooks/useNewPetForm'
import {useState, useEffect} from 'react'


const Input = styled("input")({
 display: "none",
});

export default function PetImage() {

 const { handleChange, state } = useNewPetForm()


 const [imageAsLink, setImageAsLink] = useState("");


 const handleImageAsFile = (e) => {
  const image = e.target.files[0];
  handleChange('petImage', image)
 };

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
        Pedimos 1 (uma) imagem do Pet para que outras pessoas possam vê-lo.
   </Typography>
   <Grid container spacing={3}>
    <Grid item xs={12}>
     <Button
      fullWidth
      variant="outlined"
      component="label"
      sx={{ mt: 2, mb: 2 }}
      startIcon={<PhotoCamera />}
     >
                    Escolher uma foto
      <label htmlFor="petImage">
       <Input
        id="petImage"
        name="petImage"
        accept="image/*"
        type="file"
        required
        onChange={handleImageAsFile}
       />
      </label>
     </Button>
    </Grid>
    <Grid item xs={12}>

     {imageAsLink && 
    <>
     <Typography variant="small" align="center">
            Imagem selecionada:
     </Typography>
    
     <Card>
      <CardMedia
       component="img"
       image={imageAsLink}
       alt="green iguana"
      />
     </Card>
    </>}
    </Grid>
   </Grid>
  </>
 );
}