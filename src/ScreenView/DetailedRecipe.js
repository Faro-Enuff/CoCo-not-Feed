import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchFunction from "../utils/fetchFunction";

const DetailedRecipe = () => {
  const { id } = useParams();

  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    fetchFunction(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=745b005827924e99aafc82798efabbd5`,
      setRecipeDetails
    );
  }, [id]);

  console.log(recipeDetails);

  return (
    <div className="detailed-recipe">
      {/* {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>} */}
      <h1>HEEEY {id}</h1>
      {recipeDetails && (
        <div className="recipe">
          <h1>{recipeDetails.title}</h1>
          <img
            src={recipeDetails.image}
            alt={`recipe-${recipeDetails.title}`}
          />
          <p>{recipeDetails.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default DetailedRecipe;
