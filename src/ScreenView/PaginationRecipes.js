import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Internal Import
import { FormContext } from "../Context/FormContext";
import RecipeList from "../Components/RecipeList";

// Core Import
import { Box, Container, Button, Typography, Grid } from "@material-ui/core";

// Styling
const useStyles = makeStyles((muiTheme) => ({
  header: {
    marginTop: "5%",
    borderRadius: 20,
    color: "#d7ccc8",
    textShadow: "2px 2px 2px #000000",
    paddingTop: "5%",
    textAlign: "center",
  },
  recipePreview: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    marginBottom: muiTheme.spacing(10),
  },
  btnArea: {
    display: "flex",
    maxWidth: "100%",
  },
  btn: {
    display: "block",
    marginTop: muiTheme.spacing(4),
    fontWeight: "bold",
    borderRadius: 25,
    marginLeft: 20,
  },
}));

// Component

const PaginationRecipes = () => {
  const classes = useStyles();

  // Context delivers Array of recipes, in correlation to search parameters
  const { recipePreview, isPending } = useContext(FormContext);

  // useStates for the "self made" Pagination Feature
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(5);
  const [pageNumbers, setPageNumbers] = useState([]);

  // variables for the "self made" Pagination Feature
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipePreview.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // Calculation of pages using useEffect (always fires, when recipePreview changes, ? gets bigger or smaller)

  const newArray = (size) => {
    let array = [];
    for (let i = 1; i <= size; i++) {
      array[i] = i;
    }
    return array;
  };
  // console.log(Math.ceil(recipePreview?.length / recipesPerPage));

  useEffect(() => {
    console.log(recipePreview);
    setPageNumbers(newArray(Math.ceil(recipePreview?.length / recipesPerPage)));
  }, [recipePreview]);

  // console.log(pageNumbers);

  // Responsible for changing the current page & by this changing the content
  const onClickHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.header}>
        <Typography variant="h3">Results</Typography>
      </div>
      <div className={classes.recipePreview}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {currentRecipes ? (
              <RecipeList currentRecipes={currentRecipes} />
            ) : (
              <div className="loader">Loading...</div>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.btnArea}>
              <ul className={classes.ul}>
                {pageNumbers.length >= 1 &&
                  pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                      <Button
                        color="primary"
                        variant="contained"
                        className={classes.btn}
                      >
                        <a onClick={() => onClickHandler(number)}>{number}</a>
                      </Button>
                    </li>
                  ))}
              </ul>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default PaginationRecipes;
