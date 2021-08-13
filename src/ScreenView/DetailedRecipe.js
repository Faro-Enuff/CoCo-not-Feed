import { useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { useEffect, useState } from "react";

const DetailedRecipe = () => {
  const { id } = useParams();
  console.log("!");
  const [url, setUrl] = useState(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=745b005827924e99aafc82798efabbd5`
  );

  const { data: recipeDetails, isPending, error } = useFetch(url);

  console.log(recipeDetails);

  return (
    <div className="detailed-recipe">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {recipeDetails && (
        <div className="recipe">
          <h1>{recipeDetails.title}</h1>
          <img
            src={recipeDetails.image}
            alt={`recipe-${recipeDetails.title}`}
          />
          <p>{recipeDetails.summary}</p>
        </div>
      )}
    </div>
  );
};

export default DetailedRecipe;
