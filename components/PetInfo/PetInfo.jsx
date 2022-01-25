/*
- Hooks
*/
import { useState } from "react";

/*
- Components
*/
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Link from "next/link";

/*
- Styles
*/
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  width: "60em",
  height: "25em",
  overflow: "hidden",
};

/*
- Typograhpy Style
*/
const typography = {
  display: "flex",
  alignItems: "center",
  gap: "0.3em",
  color: "#616161",
  wordBreak: "break-word",
};

export default function BasicModal({
  petName,
  petImg,
  added,
  petRace,
  petSituation,
  petDescription,
  petUid,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{ gap: "0.4em" }} onClick={handleOpen}>
        <InfoIcon /> Detalhes
      </Button>
      <Link
        href={{
          pathname: "pets/[pet]",
          query: {
            pet: petUid,
            petName,
          },
        }}
      >
        Gogo
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container component={Paper} sx={style}>
          <Grid item xs={4} component="article">
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              src={petImg}
              alt={petName}
            />
          </Grid>

          <Grid item xs={8} component="article" sx={{ p: 2 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2em",
              }}
            >
              <div style={{ display: "flex", gap: "0.4em" }}>
                <Typography variant="h6" component="h2" sx={typography}>
                  <InfoIcon />
                  Informações sobre
                </Typography>

                <Typography variant="h5" component="h3" sx={typography}>
                  <u>{petName}</u>
                </Typography>
              </div>
              <Typography component="small" sx={typography}>
                <CalendarTodayIcon /> {added}
              </Typography>
            </div>

            <div style={{ display: "flex", gap: "3.5em", marginBottom: "5em" }}>
              <Typography id="modal-modal-title" component="p" sx={typography}>
                Raça: {petRace}
              </Typography>

              <Typography
                id="modal-modal-title"
                component="p"
                noWrap={true}
                sx={typography}
              >
                Situação: {petSituation}
              </Typography>
            </div>

            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h4"
              sx={typography}
            >
              Um pouco mais sobre {petName}:
              <br />
            </Typography>
            <Typography id="modal-modal-title" component="p" sx={typography}>
              {petDescription}
            </Typography>

            <div
              style={{
                position: "absolute",
                bottom: "1.5em",
                right: "1.5em",
              }}
            >
              <Button variant="outlined">Eu quero adotar!</Button>
            </div>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
