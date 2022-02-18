/*
- Components
*/
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Skeleton from "@mui/material/Skeleton";
import { CardActionArea } from "@mui/material";
import AlertDialog from "../PetInfo/PetInfo";

export default function RecipeReviewCard({
 petName,
 petDescription,
 added,
 authorName,
 authorPhoto,
 petImg,
 petSituation,
 petRace,
 petCity,
 petState,
 upVote,
 upVotes,
 dbId,
 petUid,
 onUpVote,
 status,
 auth,
}) {
 return (
  <Card
   sx={{
    m: 2,
   }}
   elevation={2}
  >
   <CardHeader
    avatar={
     status === "idle" || status === "loading" ? (
      <Skeleton
       animation="wave"
       variant="circular"
       width={40}
       height={40}
      />
     ) : (
      <Avatar aria-label="recipe" src={authorPhoto}></Avatar>
     )
    }
    action={
     <IconButton aria-label="share">
      <ShareIcon sx={{ color: "primary.main" }} />
     </IconButton>
    }
    title={
     status === "idle" || status === "loading" ? (
      <Skeleton
       animation="wave"
       height={10}
       width="80%"
       style={{ marginBottom: 6 }}
      />
     ) : (
      `${petName}`
     )
    }
    subheader={
     status === "idle" || status === "loading" ? (
      <Skeleton animation="wave" height={10} width="40%" />
     ) : (
      `${authorName}, ${added}`
     )
    }
   />
   <CardActionArea>
    {status === "idle" || status === "loading" ? (
     <Skeleton
      sx={{ height: 190 }}
      animation="wave"
      variant="rectangular"
     />
    ) : (
     <CardMedia
      component="img"
      height="194"
      image={petImg}
      alt={petName}
     />
    )}
   </CardActionArea>

   <CardContent>
    {status === "idle" || status === "loading" ? (
     <>
      <Skeleton
       animation="wave"
       height={10}
       style={{ marginBottom: 6 }}
      />
      <Skeleton animation="wave" height={10} width="80%" />
     </>
    ) : (
     <Typography variant="body2" color="text.secondary" noWrap={true}>
      {petSituation}, em {petCity}, {petState}
     </Typography>
    )}
   </CardContent>
   <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
    <IconButton
     aria-label="Apoie esta causa"
     sx={{ color: "secondary.light", borderRadius: "0.2em" }}
     disabled={status === "idle" || status === "loading" ? true : false}
     onClick={() => onUpVote(auth, upVote, dbId, upVotes)}
    >
     <FavoriteIcon sx={{ marginRight: "0.3em" }} />
     {status === "idle" || status === "loading" ? (
      <>
       <Skeleton animation="wave" height={30} width="1em" />
      </>
     ) : (
      <>{upVote}</>
     )}
    </IconButton>

    {status === "idle" || status === "loading" ? (
     <>
      <Skeleton animation="wave" height={30} width="30%" />
     </>
    ) : (
     <AlertDialog
      petName={petName}
      petImg={petImg}
      petRace={petRace}
      petSituation={petSituation}
      added={added}
      petDescription={petDescription}
      petUid={petUid}
     />
    )}
   </CardActions>
  </Card>
 );
}
