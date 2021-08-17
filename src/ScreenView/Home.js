import { useContext, useState } from "react";
import { apiKey } from "../utils/apiKey";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import FormCon from "../Components/FormCon";
import fetchFunction from "../utils/fetchFunction";
import { FormContext } from "../Context/FormContext";
import { useHistory } from "react-router-dom";

const Home = () => {
  let history = useHistory();
  const { setRecipePreview, setIsPending } = useContext(FormContext);
  // const [error, setError] = useState(null);

  const handleFetchList = (searchTerm, diet, intolerances) => {
    console.log("WHY");

    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${searchTerm}&diet=${diet}&intolerances=${intolerances}`;

    fetchFunction(url, setRecipePreview, setIsPending);
    history.push("/recipes");
  };
  console.log("Call");
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <FormCon handleFetchList={handleFetchList} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
