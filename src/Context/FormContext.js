import { useState, createContext } from "react";

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [diet, setDiet] = useState("");
  const [recipePreview, setRecipePreview] = useState([]);

  return (
    <FormContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        intolerances,
        setIntolerances,
        diet,
        setDiet,
        recipePreview,
        setRecipePreview,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
