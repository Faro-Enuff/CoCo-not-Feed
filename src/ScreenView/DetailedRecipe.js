import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// React router dom
import { useParams, useHistory } from "react-router-dom";

// Intern Component Imports
import { apiKey } from "../utils/apiKey";
import fetchFunction from "../utils/fetchFunction";
import { FirestoreContext } from "../Context/firestoreContext";
import RecipeIngredients from "../Components/detailed/RecipeIngredients";
import RecipeMacros from "../Components/detailed/RecipeMacros";
import RecipeMicros from "../Components/detailed/RecipeMicros";
import RecipeWinePairing from "../Components/detailed/RecipeWinePairing";
import RecipeInstructions from "../Components/detailed/RecipeInstructions";
import CommentDialog from "../Components/comment/CommentDialog";
import cocoLoader2 from "../Img/cocoLoader2.png";

// Core Imports
import {
  Box,
  Grid,
  Container,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
} from "@material-ui/core";

// Icons Import
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import PeopleIcon from "@material-ui/icons/People";
import { AuthContext } from "../Context/authContext";
import { CommentContext } from "../Context/commentContext";

const useStyles = makeStyles((muiTheme) => ({
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  detailedPage: {
    paddingTop: muiTheme.spacing(4),
  },
  root: {
    maxWidth: "auto",
    maxHeight: "auto",
    borderRadius: 20,
  },
  cardContent: {
    maxHeight: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: muiTheme.transitions.create("transform", {
      duration: muiTheme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#bcaaa4",
    color: "#fff",
  },
  scoreBox: {
    display: "flex",
    flexDirection: "row",
  },
  scoreElements: {
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    marginTop: 50,
    marginBottom: 100,
    borderRadius: 20,
  },
}));

const DetailedRecipe = () => {
  const classes = useStyles();

  // React Router Dom -> get the id by using URL
  const { id } = useParams();

  let history = useHistory();

  // Use the id from the URL to fire the second fetch of this application => Receiving Details of a Recipe
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetchFunction(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`,
      setRecipeDetails,
      setIsPending
    );
  }, []);

  // Use state for UI feature, expand => for showing instructions
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { user, userData } = useContext(AuthContext);

  // Access to Firestore Context functions and useState for handling Recipe Favorites / Likes
  const { addNewFavorite, deleteFavorite, setCommunityLikes, deleteLikes } =
    useContext(FirestoreContext);

  // Access to CommentContext
  const { allocateComments } = useContext(CommentContext);

  //Retrieving the data from Firestore with realtime updating
  useEffect(() => {
    allocateComments(id);
  }, [recipeDetails]);

  // Use state for UI feature, color => for icon
  const [colorIcon, setColorIcon] = useState(false);

  useEffect(() => {
    if (userData?.favoriteRecipes?.filter((e) => e.id == id).length > 0) {
      console.log("Yuhu");
      setColorIcon(true);
    } else {
      setColorIcon(false);
    }
  }, [recipeDetails]);

  const handleFavoriteClick = () => {
    // console.log(id);
    // console.log(recipeDetails);
    if (colorIcon) {
      deleteFavorite(
        recipeDetails.title,
        recipeDetails.image,
        recipeDetails.id
      );
      deleteLikes(id, recipeDetails.title);
      setColorIcon(false);
    } else {
      addNewFavorite(
        recipeDetails.title,
        recipeDetails.image,
        recipeDetails.id
      );
      setCommunityLikes(id, recipeDetails.title);
      setColorIcon(true);
    }
  };

  const redirectSignIn = () => {
    history.push("/signin");
  };

  // console.log(recipeDetails);

  return (
    <Container component="main" maxWidth="xs" className={classes.detailedPage}>
      <div>
        {/* Loader */}
        {isPending && (
          <div className={classes.loader}>
            <Avatar size="large" src={cocoLoader2} />
          </div>
        )}

        {/* Recipe Card */}
        {recipeDetails && (
          <Grid container>
            <Grid item xs={12}>
              <Box borderRadius={23} boxShadow={2}>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <strike>CoCo</strike>
                      </Avatar>
                    }
                    title={recipeDetails.title}
                    subheader={`Ready in ${recipeDetails.readyInMinutes} min., Servings:
        ${recipeDetails.servings}`}
                  />
                  <CardMedia
                    className={classes.media}
                    image={recipeDetails.image}
                    title={`recipe-${recipeDetails.title}`}
                  />
                  <CardContent
                    className={classes.cardContent}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box p={1} alignItems="center" className={classes.scoreBox}>
                      <Box mr={5}>
                        <Typography variant="h6">Scores:</Typography>
                      </Box>

                      <Box mr={5} alignItems="flex-end">
                        <Typography variant="subtitle1">
                          <PeopleIcon color="secondary" />{" "}
                          {recipeDetails.spoonacularScore} %
                        </Typography>
                      </Box>
                      <Box alignItems="center">
                        <Typography variant="subtitle1">
                          <FitnessCenterIcon color="secondary" />{" "}
                          {recipeDetails.healthScore} %
                        </Typography>
                      </Box>
                    </Box>

                    <Typography paragraph></Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={user ? handleFavoriteClick : redirectSignIn}
                    >
                      {colorIcon ? (
                        <FavoriteIcon color="primary" />
                      ) : (
                        <FavoriteIcon />
                      )}
                    </IconButton>
                    <CommentDialog
                      recipeTitle={recipeDetails.title}
                      recipeId={recipeDetails.id}
                    />
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      i
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {recipeDetails && (
                      <RecipeInstructions
                        stepInstructions={recipeDetails.analyzedInstructions}
                        textInstructions={recipeDetails.instructions}
                      />
                    )}
                  </Collapse>
                </Card>
              </Box>
            </Grid>
          </Grid>
        )}
      </div>
      <Grid container className={classes.gridSpace}>
        <Grid item xs={12}>
          <Box borderRadius={23} boxShadow={2}>
            <Card className={classes.paper}>
              {recipeDetails && (
                <RecipeIngredients
                  ingredients={recipeDetails.extendedIngredients}
                />
              )}

              {recipeDetails && (
                <RecipeMacros nutrition={recipeDetails?.nutrition} />
              )}

              {recipeDetails && (
                <RecipeMicros nutrition={recipeDetails.nutrition} />
              )}

              {recipeDetails?.winePairing.pairedWines && (
                <RecipeWinePairing wines={recipeDetails.winePairing} />
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailedRecipe;
