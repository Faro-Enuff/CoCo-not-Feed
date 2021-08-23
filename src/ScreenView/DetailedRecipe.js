import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { apiKey } from "../utils/apiKey";
import fetchFunction from "../utils/fetchFunction";
import RecipeIngredients from "../Components/detailed/RecipeIngredients";
import RecipeMacros from "../Components/detailed/RecipeMacros";
import RecipeMicros from "../Components/detailed/RecipeMicros";
import RecipeWinePairing from "../Components/detailed/RecipeWinePairing";
import RecipeInstructions from "../Components/detailed/RecipeInstructions";
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
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((muiTheme) => ({
  detailedPage: {
    paddingTop: muiTheme.spacing(4),
  },
  root: {
    maxWidth: "auto",
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
  gridSpace: {
    marginTop: 50,
    marginBottom: 100,
  },
}));

const DetailedRecipe = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [expanded, setExpanded] = useState(false);

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
                    component="p"
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
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
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
          <Paper>
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailedRecipe;
