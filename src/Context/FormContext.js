import { useState, createContext } from "react";

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [diet, setDiet] = useState("");
  const [recipePreview, setRecipePreview] = useState([]);
  const [isPending, setIsPending] = useState(true);

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
        setIsPending,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
