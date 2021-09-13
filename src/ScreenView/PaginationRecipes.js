import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Internal Import
import { FormContext } from "../Context/FormContext";
import cocoLoader2 from "../Img/cocoLoader2.png";
import RecipeList from "../Components/RecipeList";

// Core Import
import {
  Box,
  Avatar,
  Container,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";

// Styling
const useStyles = makeStyles((muiTheme) => ({
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  header: {
    borderRadius: 25,
    color: "#d7ccc8",
    display: "flex",
    marginTop: "12%",
    justifyContent: "center",
    backgroundColor: "#efebe9",
    textShadow: "1px 1px 1px #000000",
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
    flexWrap: "wrap",
    overflow: "hidden",
    marginBottom: "15%",
  },
  btn: {
    display: "block",
    fontWeight: "bold",
    borderRadius: 25,
  },
  buttonItems: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  ul: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    display: "flex",
    maxWidth: "100%",
    flexWrap: "wrap",
    overflow: "hidden",
    marginTop: "5%",
    marginBottom: "5%",
  },
}));

// Component

const PaginationRecipes = () => {
  const classes = useStyles();

  // Context delivers Array of recipes, in correlation to search parameters
  const { recipePreview, isPending } = useContext(FormContext);

  // useStates for the "self made" Pagination Feature
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(10);
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
  console.log(recipePreview);
  // console.log(pageNumbers);

  // Responsible for changing the current page & by this changing the content
  const onClickHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        mt={2}
        p={1}
        boxShadow={3}
        border={2}
        borderRadius={25}
        borderColor="secondary.main"
        className={classes.header}
      >
        <Typography color="secondary" variant="h4">
          Your CoCravings
        </Typography>
      </Box>
      <div className={classes.recipePreview}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {currentRecipes ? (
              <RecipeList currentRecipes={currentRecipes} />
            ) : (
              <div className={classes.loader}>
                <Avatar size="large" src={cocoLoader2} />
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.btnArea}>
              <ul className={classes.ul}>
                {pageNumbers.length >= 1 &&
                  pageNumbers.map((number) => (
                    <li key={number} className={classes.buttonItems}>
                      <Box
                        m={1}
                        boxShadow={3}
                        borderRadius={25}
                        border={1}
                        borderColor="primary.main"
                      >
                        <Button
                          color="primary"
                          variant="outlined"
                          size="medium"
                          className={classes.btn}
                          onClick={() => onClickHandler(number)}
                        >
                          {number}
                        </Button>
                      </Box>
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
