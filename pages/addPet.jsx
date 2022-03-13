/*
- Hooks
*/
import { useAuth } from "../hooks/useAuth";
import { useState, useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from 'notistack';
import Link from "next/link";

/*
- Libs
*/
import { fireStore, storage } from "../services/firebase";
import { uid } from "uid/secure";

/*
- Components
*/
import CantPass from "../components/CantContinue/CantContinue";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PetsIcon from "@mui/icons-material/Pets";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import LinearProgress, {
 linearProgressClasses,
} from "@mui/material/LinearProgress";

/*
- Images
*/
import animal from "../assets/images/abandoned_animal_bill_hinchey.png";

/*
- Utils
*/
import sleep from '../utils/sleep'
import brazilData from "../utils/brazilData.json";

const cities = brazilData.estados;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
 height: 35,
 borderRadius: 5,
 [`&.${linearProgressClasses.colorPrimary}`]: {
  backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
 },
 [`& .${linearProgressClasses.bar}`]: {
  borderRadius: 5,
 },
}));

const Input = styled("input")({
 display: "none",
});

const statusMessage = {
 onSending: 'Aguarde, estamos processando os dados...',
 onSuccess: 'O pedido foi levado para avaliação, você será redirecionado em alguns segundos...',
 onNoImage: 'Pedimos que nos envie ao menos uma imagem do pet.'
}

const initialStatus = {
 status: undefined,
 message: undefined,
};

const reducer = (status, action) => {
 switch (action.type) {
 case "sending":
  return { status: "info", message: statusMessage.onSending };
 case "success":
  return { status: "success", message: statusMessage.onSuccess };
 case "noImage":
  return { status: "error", message: statusMessage.onNoImage };
 default:
  throw new Error("invalid Status");
 }
};

const AddPet = () => {
 const auth = useAuth();
 const router = useRouter();
 const { enqueueSnackbar } = useSnackbar();
 const [status, dispatch] = useReducer(reducer, initialStatus);
 const [imageAsFile, setImageAsFile] = useState("");
 const [progress, setProgress] = useState(0);
 const [city, setCity] = useState("");
 const [cityArray, setCityArray] = useState([]);
 const [state, setState] = useState("");
 
 const petRef = fireStore.collection("pets");

 const handleState = (event) => {
  if (event.target.value != "") {
   setCityArray(cities[event.target.value].cidades);
  }
  if (event.target.value == "") {
   setCityArray([]);
  }

  setState(event.target.value);
 };

 const handleCity = (e) => {
  setCity(e.target.value);
 };

 const handleImageAsFile = (e) => {
  const image = e.target.files[0];
  setImageAsFile(() => image);
 };

 const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  if (imageAsFile === "") {
   dispatch({ type: "noImage" });
   return;
  }

  dispatch({ type: "sending" });

  const uploadTask = storage
   .ref(`/images/${imageAsFile.name}`)
   .put(imageAsFile);

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
     .child(imageAsFile.name)
     .getDownloadURL()
     .then((fireBaseUrl) => {
      petRef.doc(uid()).set({
       authorId: auth.user.uid,
       authorName: auth.user.displayName,
       authorPhoto: auth.user.photoURL,
       petName: data.get("name"),
       petRace: data.get("race"),
       petSituation: data.get("situation"),
       petCity: data.get("city"),
       petState: cities[data.get("state")].nome,
       petDescription: data.get("description"),
       petUid: uid(32),
       added: new Date().toLocaleDateString(),
       pending: true,
       upVote: 0,
       upVotes: [],
       petImg: fireBaseUrl,
      }).then(() => {
       dispatch({ type: "success" });
      });
     })
   }
  );

  await sleep(1000 * 5); // awaif five seconds
  router.push("/");
 };


 useEffect(() => {
  if(status.status != undefined){
   enqueueSnackbar(status.message, { variant: status.status });
  }
 }, [status])

 if (!auth.user) {
  return <CantPass />;
 }

 return (
  <>
   <Grid container component="main" sx={{ height: "100vh" }}>
    <Grid
     item
     xs={false}
     sm={4}
     md={7}
     sx={{
      backgroundImage: `url(${animal.src})`,
      backgroundRepeat: "no-repeat",
      backgroundColor: (t) =>
       t.palette.mode === "light"
        ? t.palette.grey[50]
        : t.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
     }}
    />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
     <Box
      sx={{
       my: 8,
       mx: 4,
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
      <Box
       component="form"
       noValidate
       autoComplete="off"
       onSubmit={handleSubmit}
       sx={{ mt: 3 }}
      >
       <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
         <TextField
          autoComplete="given-name"
          name="name"
          required
          fullWidth
          id="name"
          label="Nome"
          autoFocus
          type="text"
         />
        </Grid>
        <Grid item xs={12} sm={4}>
         <TextField
          required
          fullWidth
          id="race"
          label="Raça"
          name="race"
          autoComplete="race-name"
          type="text"
         />
        </Grid>

        <Grid item xs={3} sx={{ display: "flex" }}>
         <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
          <InputLabel id="state">Estado</InputLabel>
          <Select
           labelId="state"
           name="state"
           id="state"
           value={state}
           onChange={handleState}
           label="Estado"
          >
           {brazilData.estados.map((data, index) => {
            return (
             <MenuItem key={data.sigla} value={index}>
              {data.nome}
             </MenuItem>
            );
           })}
          </Select>
         </FormControl>
        </Grid>

        <Grid item xs={9} sx={{ display: "flex" }}>
         <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
          <InputLabel id="city">Cidade</InputLabel>

          <Select
           labelId="city"
           id="city"
           name="city"
           value={city}
           label="Cidade"
           onChange={handleCity}
           disabled={!state}
          >
           {cityArray.map((data) => {
            return (
             <MenuItem key={data} value={data}>
              {data}
             </MenuItem>
            );
           })}
          </Select>
         </FormControl>
        </Grid>

        <Grid item xs={12}>
         <TextField
          required
          fullWidth
          name="situation"
          id="situation"
          label="Situação"
          type="text"
         />
        </Grid>

        <Grid item xs={12}>
         <TextField
          required
          fullWidth
          name="description"
          id="description"
          label="Nos conte um pouco mais..."
          type="text"
          multiline
          rows={4}
         />
        </Grid>
       </Grid>

       <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={6}>
         <Button
          fullWidth
          variant="outlined"
          component="label"
          sx={{ mt: 2, mb: 2 }}
          startIcon={<PhotoCamera />}
         >
                    Escolha uma foto
          <label htmlFor="icon-button-file">
           <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={handleImageAsFile}
           />
          </label>
         </Button>
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
         {progress > 1 ? (
          <Box sx={{ marginTop: "1em" }}>
           <BorderLinearProgress
            variant="determinate"
            value={progress}
           />
          </Box>
         ) : (
          <Button
           type="submit"
           fullWidth
           variant="contained"
           sx={{ mt: 2, mb: 2 }}
           startIcon={<SendIcon />}
          >
                      Enviar dados
          </Button>
         )}
        </Grid>
       </Grid>

       <Grid container justifyContent="flex-end">
        <Grid item>
         <Link href="/" variant="body2" passHref>
          <Typography component="a" color="primary.main">
                      Desejo voltar a página principal
          </Typography>
         </Link>
        </Grid>
       </Grid>
      </Box>
     </Box>
    </Grid>
   </Grid>
      );
  </>
 );
};

export default AddPet;
