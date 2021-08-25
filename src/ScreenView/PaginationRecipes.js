import React from "react";
import { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import RecipeList from "../Components/RecipeList";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FormContext } from "../Context/FormContext";

const useStyles = makeStyles((muiTheme) => ({
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

const PaginationRecipes = () => {
  const classes = useStyles();
  const { recipePreview, isPending } = useContext(FormContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(5);
  const [pageNumbers, setPageNumbers] = useState([]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipePreview.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  useEffect(() => {
    for (
      let i = 1;
      i <= Math.ceil(recipePreview.length / recipesPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <Container component="main" maxWidth="xs">
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
                        <a onClick={() => paginate(number)}>{number}</a>
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
