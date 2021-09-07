import React, { useContext } from "react";

// React Router Dom
import { useHistory } from "react-router-dom";

// Internal Imports
import { apiKey } from "../utils/apiKey";
import FormCon from "../Components/search/FormCon";
import fetchFunction from "../utils/fetchFunction";
import { FormContext } from "../Context/FormContext";

// Core Imports
import { Container, Grid } from "@material-ui/core";

const Home = () => {
  let history = useHistory();

  // Form Context to receive all the necessary data
  const { setSearch, setRecipePreview, setIsPending, order } =
    useContext(FormContext);

  // Click Handler for the fetch function for the Recipe List by creating URL out of all Inputs
  const handleFetchList = (search) => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${
      search.searchTerm
    }&diet=${search.diet}&intolerances=${
      search.intolerances
    }&instructionsRequired=true&sort=${search.preference}&sortDirection=${
      order ? "asc" : "desc"
    }`;

    // console.log(url);

    // Fetch Function
    fetchFunction(url, setRecipePreview, setIsPending);

    // Redirect to the Recipe List
    history.push("/recipes");

    // Reset the Input Values
    setSearch({
      searchTerm: "",
      intolerances: "",
      diet: "",
      preference: "popularity",
    });
  };

  return (
    <Container>
      <Grid container>
        <Grid item xxs={12} sm={12} md={12}>
          <FormCon handleFetchList={handleFetchList} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
