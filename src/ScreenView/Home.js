import RecipeList from "../Components/RecipeList";
import { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import FormCon from "../Components/FormCon";
import fetchFunction from "../utils/fetchFunction";
import { FormContext } from "../Context/FormContext";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { recipePreview, setRecipePreview } = useContext(FormContext);
  let history = useHistory();
  // const [isPending, setIsPending] = useState(true);
  // const [error, setError] = useState(null);

  const handleFetchList = (searchTerm, diet, intolerances) => {
    console.log("WHY");

    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=745b005827924e99aafc82798efabbd5&includeIngredients=${searchTerm}&diet=${diet}&intolerances=${intolerances}`;

    fetchFunction(url, setRecipePreview);
    history.push("/recipes");
  };
  console.log("Call");
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <FormCon handleFetchList={handleFetchList} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {/* {recipePreview && <h1>{recipePreview.length}</h1>}
          {recipePreview && <PaginationRecipes recipePreview={recipePreview} />} */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
