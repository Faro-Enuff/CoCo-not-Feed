import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { apiKey } from "../utils/apiKey";
import fetchFunction from "../utils/fetchFunction";
import { FirestoreContext } from "../Context/firestoreContext";
import { CommentContext } from "../Context/commentContext";
import RecipeIngredients from "../Components/detailed/RecipeIngredients";
import RecipeMacros from "../Components/detailed/RecipeMacros";
import RecipeMicros from "../Components/detailed/RecipeMicros";
import RecipeWinePairing from "../Components/detailed/RecipeWinePairing";
import RecipeInstructions from "../Components/detailed/RecipeInstructions";
import CommentDialog from "../Components/comment/CommentDialog";
/////
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CommentIcon from "@material-ui/icons/Comment";

const useStyles = makeStyles((muiTheme) => ({
  detailedPage: {
    paddingTop: muiTheme.spacing(4),
  },
  root: {
    maxWidth: "auto",
    borderRadius: 20,
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
  paper: {
    marginTop: 50,
    marginBottom: 100,
    borderRadius: 20,
  },
}));

const DetailedRecipe = () => {
  const classes = useStyles();
  const { id } = useParams();
  let history = useHistory();
  const {
    addNewFavorite,
    deleteFavorite,
    favorites,
    setCommunityLikes,
    deleteLikes,
  } = useContext(FirestoreContext);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [colorIcon, setColorIcon] = useState(false);

  ///////////////////////////////////////////////////////
  //Fetch
  useEffect(() => {
    fetchFunction(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`,
      setRecipeDetails,
      setIsPending
    );
  }, [id]);

  ///////////
  useEffect(() => {
    if (favorites.filter((e) => e.id == id).length > 0) {
      console.log("Yuhu");
      setColorIcon(true);
    } else {
      setColorIcon(false);
    }
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      console.log("Hihi");
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
  // console.log(recipeDetails);
  return (
    <Container component="main" maxWidth="xs" className={classes.detailedPage}>
      <div>
        {isPending && <div>Loading...</div>}
        {recipeDetails && (
          <Grid container>
            <Grid item xs={12}>
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
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="div"
                  >
                    <Typography paragraph>
                      <b>Community Score: </b> {recipeDetails.spoonacularScore}{" "}
                      %
                    </Typography>
                    <Typography paragraph>
                      <b>Health Score: </b> {recipeDetails.healthScore} %
                    </Typography>
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={handleFavoriteClick}
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
            </Grid>
          </Grid>
        )}
      </div>
      <Grid container className={classes.gridSpace}>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailedRecipe;
