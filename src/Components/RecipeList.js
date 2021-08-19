import React, { useState } from "react";
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
const RecipeList = ({ currentRecipes }) => {
  const classes = useStyles();

  return (
    <Grid container>
      {currentRecipes.map((recipe) => (
        <div className="recipe-preview" key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
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
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {recipe.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Recipe
                </Button>
                <Button size="small" color="primary">
                  Ingredients
                </Button>
                <Button
                  size="small"
                  color="primary"
                  endIcon={<FavoriteBorderIcon />}
                ></Button>
              </CardActions>
            </Card>
          </Link>
        </div>
      ))}
    </Grid>
  );
};

export default RecipeList;
