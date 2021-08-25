import { useState, createContext } from "react";

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {
  const [order, setOrder] = useState(false);
  const [search, setSearch] = useState({
    searchTerm: "",
    intolerances: "",
    diet: "",
    preference: "popularity",
  });
  const [recipePreview, setRecipePreview] = useState([]);
  const [isPending, setIsPending] = useState(true);

  return (
    <FormContext.Provider
      value={{
        search,
        setSearch,
        recipePreview,
        setRecipePreview,
        setIsPending,
        order,
        setOrder,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
