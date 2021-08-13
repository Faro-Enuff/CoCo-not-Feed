import SearchBarInput from "../Components/SearchBarInput";
import RecipeList from "../Components/RecipeList";
import { useState, useEffect } from "react";
import useFetch from "../utils/useFetch";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

const Home = () => {
  //Custom Hook - Fetch
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [url, setUrl] = useState(null);
  const { data: recipePreview, isPending, error } = useFetch(url);

  //CheckBox
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [checkBoxDiet, setCheckBoxDiet] = useState({
    Vegan: false,
    Vegetarian: false,
    Pescetarian: false,
    Paleo: false,
  });
  const handleChangeDiet = (event) => {
    setCheckBoxDiet({
      ...checkBoxDiet,
      [event.target.name]: event.target.checked,
    });
    // console.log(event.target.name);
  };
  const [diet, setDiet] = useState("");
  useEffect(() => {
    const diet = Object.keys(checkBoxDiet)
      .filter((property) => checkBoxDiet[property])
      .join(",");
    // console.log(diet);
    setDiet(diet);
  }, [checkBoxDiet]);
  // console.log(diet);
  const [checkBoxIntolerances, setCheckBoxIntolerances] = useState({
    Gluten: false,
    Dairy: false,
    Peanut: false,
    Soy: false,
    Egg: false,
  });
  const handleChangeIntolerances = (event) => {
    setCheckBoxIntolerances({
      ...checkBoxIntolerances,
      [event.target.name]: event.target.checked,
    });
    // console.log(event.target.name);
  };
  const [intolerances, setIntolerances] = useState("");
  useEffect(() => {
    const intolerances = Object.keys(checkBoxIntolerances)
      .filter((property) => checkBoxIntolerances[property])
      .join(",");
    setIntolerances(intolerances);
  }, [checkBoxIntolerances]);
  // console.log(intolerances);

  //Search
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFetchList = () => {
    setUrl(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=745b005827924e99aafc82798efabbd5&includeIngredients=${searchTerm}&diet=${diet}&intolerances=${intolerances}`
    );
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <SearchBarInput
            handleSearch={handleSearch}
            handleFetchList={handleFetchList}
            searchTerm={searchTerm}
            handleChangeDiet={handleChangeDiet}
            checkBoxDiet={checkBoxDiet}
            handleChangeIntolerances={handleChangeIntolerances}
            checkBoxIntolerances={checkBoxIntolerances}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {recipePreview && (
            <RecipeList recipePreview={recipePreview.results} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
