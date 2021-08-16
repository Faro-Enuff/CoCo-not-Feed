import React from "react";
import { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import RecipeList from "./RecipeList";
import { usePagination } from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { FormContext } from "../Context/FormContext";

const useStyles = makeStyles({
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
  },
});

const PaginationRecipes = () => {
  const classes = useStyles();
  const { recipePreview } = useContext(FormContext);
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(1);

  //Get current recipes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipePreview.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  //Change page
  // const onClickHandler = (event, pageNumber) => {
  //   event.preventDefault();
  //   paginate(pageNumber);
  // };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  for (let i = 1; i <= Math.ceil(recipePreview.length / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <Grid item xs={12} sm={12} md={12}>
        {currentRecipes && <RecipeList currentRecipes={currentRecipes} />}
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <nav>
          <ul className={classes.ul}>
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <a
                  onClick={() => paginate(number)}
                  href="/recipes"
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Grid>
    </div>
  );
};

export default PaginationRecipes;
