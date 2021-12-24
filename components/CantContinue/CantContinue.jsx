import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import { useRouter } from "next/router";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link href="/">
        <a style={{ color: "#ec407a", textDecoration: "none" }}>
          Meu bem-querer
        </a>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function CantPass() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/entrar");
  };

  const handleCreateAccount = () => {
    router.push("/");
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          minHeight: "80vh",
          display: "flex",
          justifyContent: "space-between",
        }}
        component="main"
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Parece que você não está autorizado a continuar...
          </Typography>

          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="outlined" onClick={handleLogin}>
              Entrar conta existente
            </Button>
            <Button variant="contained" onClick={handleCreateAccount}>
              Criar uma nova Conta
            </Button>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "background.paper" }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          <Link href="/">
            <a style={{ color: "#ec407a", textDecoration: "none" }}>
              Voltar à página inicial
            </a>
          </Link>
        </Typography>

        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
}
