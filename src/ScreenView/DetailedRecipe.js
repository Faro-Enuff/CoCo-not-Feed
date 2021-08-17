import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiKey } from "../utils/apiKey";
import fetchFunction from "../utils/fetchFunction";
import RecipeIngredients from "../Components/RecipeIngredients";
import RecipeMacros from "../Components/RecipeMacros";
import RecipeMicros from "../Components/RecipeMicros";
import RecipeWinePairing from "../Components/RecipeWinePairing";

const DetailedRecipe = () => {
  const { id } = useParams();

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetchFunction(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`,
      setRecipeDetails,
      setIsPending
    );
  }, [id]);

  console.log(recipeDetails);

  return (
    <div className="detailed-recipe">
      {isPending && <div>Loading...</div>}
      {recipeDetails && (
        <div className="recipe">
          <h1>{recipeDetails.title}</h1>
          <h2>
            Ready in {recipeDetails.readyInMinutes} min., Servings:
            {recipeDetails.servings}
          </h2>
          <h3>Community Score: {recipeDetails.spoonacularScore}</h3>
          <h3>HealthScore: {recipeDetails.healthScore}</h3>
          <img
            src={recipeDetails.image}
            alt={`recipe-${recipeDetails.title}`}
          />
          <h4>Source: {recipeDetails.sourceName}</h4>
        </div>
      )}
      {recipeDetails && (
        <RecipeIngredients ingredients={recipeDetails.extendedIngredients} />
      )}
      {recipeDetails && <RecipeMacros nutrition={recipeDetails.nutrition} />}
      {recipeDetails && <RecipeMicros nutrition={recipeDetails.nutrition} />}
      {recipeDetails && recipeDetails.winePairing.pairedWines && (
        <RecipeWinePairing wines={recipeDetails.winePairing} />
      )}
    </div>
  );
};

export default DetailedRecipe;
