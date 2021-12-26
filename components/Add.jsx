import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { uid } from "uid/secure";
import firebase from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PetsIcon from "@mui/icons-material/Pets";
import Typography from "@mui/material/Typography";
import SucessMessage from "../components/Success/Success";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useRouter } from "next/router";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import animal from "../assets/images/abandoned_animal_bill_hinchey.png";

import brazilData from "../utils/brazilData.json";

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

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Meu bem-querer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function AnnouncePet() {
  const auth = useAuth();
  const router = useRouter();

  const db = firebase.firestore();
  const storage = firebase.storage();
  const petRef = db.collection("pets");

  const [imageAsFile, setImageAsFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [cityArray, setCityArray] = useState([]);
  const [state, setState] = useState("");

  const citties = brazilData.estados;

  const handleState = (event) => {
    if (event.target.value != "") {
      setCityArray(citties[event.target.value].cidades);
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
    setImageAsFile((imageFile) => image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }

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
        setOpen((prevState) => !prevState);
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
              petState: citties[data.get("state")].nome,
              petDescription: data.get("description"),
              petUid: uid(32),
              added: new Date().toLocaleDateString(),
              pending: true,
              upVote: 0,
              upVotes: [],
              petImg: fireBaseUrl,
            });
          })
          .then(() =>
            setTimeout(() => setOpen((prevState) => !prevState), 1500)
          );
      }
    );

    setTimeout(() => {
      router.push("/");
    }, 3500);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
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
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

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
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {cityArray.map((data, index) => {
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
                >
                  Selecione uma imagem
                  <input type="file" hidden onChange={handleImageAsFile} />
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
                  >
                    Buscar um dono agora
                  </Button>
                )}
              </Grid>
            </Grid>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Desejo voltar a página principal
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Grid>
      <SucessMessage open={open} />
    </Grid>
  );
}
