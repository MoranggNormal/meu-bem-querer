import {useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import PetInfo from './FirstStep/Index';
import PetDesc from './SecondStep/Index';
import PetImage from './ThirdStep/Index';
import Review from './FinalStep/Index';

import { NewPetFormProvider } from '../../context/newPetFormContext'



const steps = ['Informações', 'Descrição', 'Foto', 'Confirmar doação'];

function getStepContent(step) {
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

export default function NewPetForm() {
 const [activeStep, setActiveStep] = useState(0);

 const handleNext = () => {
  setActiveStep(activeStep + 1);
 };

 const handleBack = () => {
  setActiveStep(activeStep - 1);
 };

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
       <NewPetFormProvider>
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
         {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Voltar
          </Button>
         )}

         <Button
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 3, ml: 1 }}
         >
          {activeStep === steps.length - 1 ? 'Confirmar' : 'Próximo'}
         </Button>
        </Box>
       </NewPetFormProvider>
      </>
     )}
    </>
   </Paper>
  </Container>
 );
}