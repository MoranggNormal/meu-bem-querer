/*
- Hooks
*/
import { useAuth } from "../hooks/useAuth";
/*
- Libs
*/

/*
- Components
*/
import CantPass from "../components/CantContinue/CantContinue";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PetsIcon from "@mui/icons-material/Pets";
import Typography from "@mui/material/Typography";

import NewPetForm from '../components/NewPetForm/Index'

/*
- Images
*/
import animal from "../assets/images/abandoned_animal_bill_hinchey.png";


const AddPet = () => {
 const auth = useAuth(); 

 if (!auth.user) {
  return <CantPass />;
 }

 return (
  <>
   <Grid container component="main" sx={{ height: "90vh", maxHeight: "90vh" }}>
    <Grid
     item
     xs={false}
     sm={4}
     md={5}
     sx={{
      backgroundImage: `url(${animal.src})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      maxHeight: "100%"
     }}
    />
    <Grid item xs={12} sm={8} md={7} elevation={6} square sx={{maxHeight: "100%", overflowY: 'scroll'}}>
     <Box
      sx={{
       my: 8,
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       
      }}
     >
       
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
       <PetsIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
              Eles aguardam por alguém...
      </Typography>
      
      <NewPetForm />
     </Box>
    </Grid>
   </Grid>
  </>
 );
};

export default AddPet;
