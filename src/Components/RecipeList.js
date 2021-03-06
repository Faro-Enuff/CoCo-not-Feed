import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// Internal Imports
import { FirestoreContext } from "../../src/Context/firestoreContext";

// Icons Import
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

// Core Imports
import {
  Box,
  Typography,
  Card,
  Button,
  CardMedia,
  CardContent,
  Grid,
  CardActionArea,
  CardActions,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: theme.spacing(4),
  },
  container: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  root: {
    minWidth: "100%",
    backgroundColor: "#fff",
    padding: 0,
    borderRadius: 20,
  },
  likeButtonDiv: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    justifyContent: "right",
    alignItems: "flex-end",
  },
}));

const RecipeList = ({ currentRecipes }) => {
  const { likes, allocateLikes } = useContext(FirestoreContext);
  const classes = useStyles();
  // console.log(currentRecipes);
  useEffect(() => {
    allocateLikes(currentRecipes);
  }, [currentRecipes]);
  // console.log(likes);
  return (
    <div className="recipeImportant">
      {currentRecipes?.map((recipe, key) => (
        <div className="recipes" key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <Grid container className={classes.grid}>
              <Grid item xs={12}>
                <Box borderRadius={23} boxShadow={3}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        value={`${currentRecipes.id}`}
                        component="img"
                        alt={`${recipe.title}`}
                        height="140"
                        image={recipe.image}
                        title={`${recipe.title}`}
                      />
                      <CardContent className={classes.background}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h2"
                          color="secondary"
                        >
                          {recipe.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.likeButtonDiv}>
                      <Button
                        size="medium"
                        color="secondary"
                        endIcon={<FavoriteBorderIcon />}
                        className={classes.likeButton}
                      >
                        {likes
                          ?.filter((e) => e.title === recipe.title)
                          .map((selectedLikes, key) => (
                            <Typography variant="subtitle1" key={key}>
                              <b>{selectedLikes?.likes?.length}</b>
                            </Typography>
                          ))}
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
