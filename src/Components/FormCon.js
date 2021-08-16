import React from "react";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBarInput from "./SearchBarInput";
import FilterCheckDiet from "./FilterCheckDiet";
import FilterCheckIntolerances from "./FilterCheckIntolerances";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { FormContext } from "../Context/FormContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(2),
  },
}));

const FormCon = ({ handleFetchList }) => {
  const classes = useStyles();

  const { searchTerm, diet, intolerances } = useContext(FormContext);

  console.log(searchTerm);
  console.log(diet);
  console.log(intolerances);

  const handlerButton = () => {
    handleFetchList(searchTerm, diet, intolerances);
  };

  return (
    <div className={classes.formControl}>
      <FormControl>
        <SearchBarInput />
        <FilterCheckDiet />
        <FilterCheckIntolerances />
        <Button variant="contained" color="secondary" onClick={handlerButton}>
          CoCo Search
        </Button>
      </FormControl>
    </div>
  );
};

export default FormCon;
