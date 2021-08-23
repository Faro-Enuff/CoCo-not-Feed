import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((muiTheme) => ({
  container: {
    paddingRight: 0,
    paddingLeft: 0,
    marginTop: muiTheme.spacing(4),
  },
  root: {
    minWidth: "100%",
    backgroundColor: "#fff",
    padding: 0,
  },
  background: {},
}));

const RecipeList = ({ currentRecipes }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className="recipeImportant">
        {currentRecipes.map((recipe) => (
          <div className="recipes" key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <Grid container spacing={10} className={classes.grid}>
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
                    <CardActions>
                      <Button
                        size="small"
                        color="secondary"
                        endIcon={<FavoriteBorderIcon />}
                      >
                        Favorite
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default RecipeList;
