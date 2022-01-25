import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import {useAuth} from "../hooks/useAuth";
import {useRouter} from "next/router";

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
                Your Website
   </Link>{" "}
   {new Date().getFullYear()}
   {"."}
  </Typography>
 );
}

export default function SignInSide() {
 const auth = useAuth();
 const router = useRouter();

 const handleSignInWithGoogle = async () => {
  await auth.signInWithGoogle();

  router.push("/");
 };

 const handleSignInWithFacebook = async () => {
  await auth.signInWithFacebook();

  router.push("/");
 };

 const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  // eslint-disable-next-line no-console
  console.log({
   email: data.get("email"),
   password: data.get("password"),
  });
 };

 return (
  <Grid container component="main" sx={{height: "100vh"}}>
   <CssBaseline/>
   <Grid
    item
    xs={false}
    sm={3}
    md={4}
    sx={{
     backgroundImage:
                        "url(https://cdn.pixabay.com/photo/2017/02/15/12/12/cat-2068462_960_720.jpg)",
     backgroundRepeat: "no-repeat",
     backgroundColor: (t) =>
      t.palette.mode === "light"
       ? t.palette.grey[50]
       : t.palette.grey[900],
     backgroundSize: "cover",
     backgroundPosition: "center",
    }}
   />
   <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
    <Box
     sx={{
      my: 8,
      mx: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
     }}
    >
     <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
      <LockOutlinedIcon/>
     </Avatar>
     <Typography component="h1" variant="h5">
                        Entrar em minha conta
     </Typography>
     <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{mt: 1}}
     >
      <TextField
       margin="normal"
       required
       fullWidth
       id="email"
       label="E-mail"
       name="email"
       autoComplete="email"
       autoFocus
      />
      <TextField
       margin="normal"
       required
       fullWidth
       name="password"
       label="Senha"
       type="password"
       id="password"
       autoComplete="current-password"
      />

      <Button
       type="submit"
       fullWidth
       variant="contained"
       sx={{mt: 3, mb: 2}}
      >
                            Sign In
      </Button>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <Button
         fullWidth
         variant="contained"
         onClick={() => handleSignInWithFacebook()}
        >
         <FacebookIcon/>
        </Button>
       </Grid>
       <Grid item xs={12} sm={6}>
        <Button
         fullWidth
         variant="contained"
         onClick={() => handleSignInWithGoogle()}
        >
         <GoogleIcon/>
        </Button>
       </Grid>
      </Grid>
      <Grid container sx={{marginTop: "1em"}}>
       <Grid item xs={12}>
        <Link href="#" variant="body2">
                                    Esqueceu a senha?
        </Link>
       </Grid>
       <br/>

       <Grid item xs>
        <Link href="#" variant="body2">
         {"Criar uma nova conta"}
        </Link>
       </Grid>
       <br/>
       <Grid item>
        <Link href="/" variant="body2">
                                    Voltar ao início
        </Link>
       </Grid>
      </Grid>
      <Copyright sx={{mt: 5}}/>
     </Box>
    </Box>
   </Grid>
   <Grid
    item
    xs={false}
    sm={3}
    md={4}
    sx={{
     backgroundImage:
                        "url(https://cdn.pixabay.com/photo/2018/03/31/06/31/dog-3277416_960_720.jpg)",
     backgroundRepeat: "no-repeat",
     backgroundColor: (t) =>
      t.palette.mode === "light"
       ? t.palette.grey[50]
       : t.palette.grey[900],
     backgroundSize: "cover",
     backgroundPosition: "center",
    }}
   />
  </Grid>
 );
}
