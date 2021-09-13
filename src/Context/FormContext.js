import { useState, createContext } from "react";

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {
  const [order, setOrder] = useState(false);
  const [search, setSearch] = useState({
    searchTerm: "",
    intolerances: "",
    diet: "",
    preference: "calories",
  });
  const [recipePreview, setRecipePreview] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const value = {
    search,
    setSearch,
    recipePreview,
    setRecipePreview,
    setIsPending,
    order,
    setOrder,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
