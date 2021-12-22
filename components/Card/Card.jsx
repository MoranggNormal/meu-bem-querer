import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import firebase from "firebase";
import { CardActionArea } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({
  petName,
  petDescription,
  added,
  authorName,
  authorPhoto,
  petImg,
  petSituation,
  petCity,
  petState,
  loading,
  upVote,
  upVotes,
  dbId,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const auth = useAuth();

  const db = firebase.firestore();
  const petRef = db.collection("pets");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUpVote = (upVote, dbId, upVotes) => {
    if (upVotes.includes(auth.user.uid)) {
      petRef.doc(dbId).update({
        upVote: (upVote -= 1),
        upVotes: upVotes.filter((e) => e != auth.user.uid),
      });
    } else {
      petRef.doc(dbId).update({
        upVote: (upVote += 1),
        upVotes: [...upVotes, auth.user.uid],
      });
    }
  };

  return (
    <Card
      sx={{
        margin: "1em",
      }}
    >
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={authorPhoto}
            ></Avatar>
          )
        }
        action={
          <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        }
        title={
          loading ? (
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
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            `${authorName}, ${added}`
          )
        }
      />
      <CardActionArea>
        {loading ? (
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
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {petSituation}, em {petCity}, {petState}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => handleUpVote(upVote, dbId, upVotes)}
        >
          <FavoriteIcon sx={{ marginRight: "0.3em" }} /> {upVote}
        </IconButton>

       

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography component="small" variant="h5">
            Sobre {petName}:
          </Typography>
          <hr />
          <Typography paragraph sx={{ mt: "2em" }}>
            - {petDescription}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
