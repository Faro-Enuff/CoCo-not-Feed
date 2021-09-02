import React, { useContext, useEffect } from "react";
import { FirestoreContext } from "../../src/Context/firestoreContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

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
  likeButton: {
    display: "flex",
    textAlign: "right",
    justifyContent: "right",
    alignItems: "right",
  },
}));

const RecipeList = ({ currentRecipes }) => {
  const { likes, allocateLikes } = useContext(FirestoreContext);
  const classes = useStyles();
  console.log(currentRecipes);
  useEffect(() => {
    allocateLikes(currentRecipes);
  }, [currentRecipes]);
  // console.log(likes);
  return (
    <div className="recipeImportant">
      {currentRecipes.map((recipe, key) => (
        <div className="recipes" key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <Grid container className={classes.grid}>
              <Grid item xs={12}>
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
                  <CardActions className={classes.likeButton}>
                    <div>
                      <Button
                        size="medium"
                        color="secondary"
                        endIcon={<FavoriteBorderIcon />}
                      >
                        {likes
                          ?.filter((e) => e.title === recipe.title)
                          .map((selectedLikes) => (
                            <p>{selectedLikes.likes.length}</p>
                          ))}
                      </Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
