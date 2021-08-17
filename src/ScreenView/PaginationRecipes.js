import React from "react";
import { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import RecipeList from "../Components/RecipeList";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FormContext } from "../Context/FormContext";

const useStyles = makeStyles({
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
  },
  buttonA: {
    display: "block",
    width: 100,
    height: 100,
  },
});

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
    <div>
      <Grid item xs={12} sm={12} md={12}>
        {currentRecipes ? (
          <RecipeList currentRecipes={currentRecipes} />
        ) : (
          <div className="loader">Loading...</div>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <nav>
          <ul className={classes.ul}>
            {pageNumbers.length >= 1 &&
              pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <Button>
                    <a onClick={() => paginate(number)} className="page-link">
                      {number}
                    </a>
                  </Button>
                </li>
              ))}
          </ul>
        </nav>
      </Grid>
    </div>
  );
};

export default PaginationRecipes;
