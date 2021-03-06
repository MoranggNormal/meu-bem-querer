import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import WithTransition from '../WithTransition/Index';

import PetInfo from './FirstStep/Index';
import PetDesc from './SecondStep/Index';
import PetImage from './ThirdStep/Index';
import Review from './FinalStep/Index';

import { useAuth } from '../../hooks/useAuth';
import useNewPetForm from '../../hooks/useNewPetForm'
import { fireStore, storage } from "../../services/firebase";
import { uid } from "uid/secure";

const ActionHandler = ({onClick, actionName, disabled	}) => {
 return (
  <Button
   variant={actionName === 'Voltar' ? 'outlined' : 'contained'}
   onClick={onClick}
   disabled={disabled}
   sx={{ mt: 3, ml: 1 }}
  >
   {actionName}
  </Button>
 )
}

const steps = ['Informações', 'Descrição', 'Foto', 'Confirmar doação'];


function NewPetForm() {
 const [activeStep, setActiveStep] = useState(0);
 const [, setProgress] = useState(0);
 const [disabledButton, setDisabledButton] = useState(false);
 const auth = useAuth();
 const {state} = useNewPetForm();
 const {petName, petType, petRace, petWeight, petSize, petCity, petState, petGender, petAge, petDescription, petImage} = state
 const petRef = fireStore.collection("pets");

 const getStepContent = (step) => {
  switch (step) {
  case 0:
   return <PetInfo />;
  case 1:
   return <PetDesc />;
  case 2:
   return <PetImage />;
  case 3:
   return <Review />;
  default:
   throw new Error('Unknown step');
  }
 }

 const handleNext = () => {

  if(activeStep === steps.length - 1){

   const uploadTask = storage
    .ref(`/images/${state.petImage.name}`)
    .put(state.petImage);

   uploadTask.on(
    "state_changed",
    (snapShot) => {
     const progress =
               (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
     setProgress(parseInt(progress.toFixed(0)));
    },
    (err) => {
     console.log(err);
    },
    () => {
     setProgress(0);
     
     storage
      .ref("images")
      .child(state.petImage.name)
      .getDownloadURL()
      .then((fireBaseUrl) => {
       // delete image file before send
       delete state.petImage;
       // send to db
       petRef.doc(uid()).set({
        authorId: auth.user.uid,
        authorName: auth.user.displayName,
        authorPhoto: auth.user.photoURL,
        petUid: uid(16),
        added: new Date().toLocaleDateString(),
        pending: true,
        upVote: 0,
        upVotes: [],
        petImg: fireBaseUrl,
        ...state
       }).then(() => {
        console.log('certo')
       });
      })
    }
   );
  }

  setActiveStep(activeStep + 1);
 };

 const handleBack = () => {
  setActiveStep(activeStep - 1);
 };



 useEffect(() => {

  const verifyValuesByStep = (step) => {
   if(step === 0){
    if(petName && petType && petRace && petWeight && petSize && petCity && petState && petGender && petAge){
     setDisabledButton(() => false)
    }else{
     setDisabledButton(() => true)
    }
   }

   if(step === 1){
    if(petDescription)
    {
     setDisabledButton(() => false)
    }else{
     setDisabledButton(() => true)
    }
   }

   if(step === 2){
    if(petImage)
    {
     setDisabledButton(() => false)
    }else{
     setDisabledButton(() => true)
    }
   }
  }

  verifyValuesByStep(activeStep)
 }, [activeStep, petAge, petCity, petDescription, petGender, petImage, petName, petRace, petSize, petState, petType, petWeight])

 return (
  <Container component="form"  sx={{ mb: 4 }}>
   <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
    <Typography component="h1" variant="h4" align="center">
            Doação
    </Typography>
    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, flexFlow: 'row wrap', gap: '0.3em' }}>
     {steps.map((label) => (
      <Step key={label}>
       <StepLabel>{label}</StepLabel>
      </Step>
     ))}
    </Stepper>
    <>
     {activeStep === steps.length ? (
      <>
       <Typography variant="h5" gutterBottom>
                  Tudo certo,
       </Typography>
       <Typography variant="subtitle1">
                  Os dados foram enviados para verificação, em breve você será notificado. 
       </Typography>
      </>
     ) : (
      <>
       <WithTransition key={activeStep}>
        {getStepContent(activeStep)}
       </WithTransition>
       <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {activeStep !== 0 && (
         <ActionHandler onClick={handleBack} actionName="Voltar" />
        )}

        {activeStep === steps.length - 1 ?
         <ActionHandler onClick={handleNext} actionName="Confirmar" disabled={disabledButton} /> :
         <ActionHandler onClick={handleNext} actionName="Próximo" disabled={disabledButton} />}

         
       </Box>
       
      </>
     )}
    </>
   </Paper>
  </Container>
  
 );
}

export default NewPetForm