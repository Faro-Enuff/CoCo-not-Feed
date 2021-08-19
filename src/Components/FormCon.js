import React from "react";
import Grid from "@material-ui/core/Grid";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBarInput from "./SearchBarInput";
import FilterCheckDiet from "./FilterCheckDiet";
import FilterCheckIntolerances from "./FilterCheckIntolerances";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { FormContext } from "../Context/FormContext";
import FilterRadioSorting from "./FilterRadioSorting";

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

  const { searchTerm, diet, intolerances, value, order } =
    useContext(FormContext);

  console.log(searchTerm);
  console.log(diet);
  console.log(intolerances);
  console.log(value);

  const handlerButton = () => {
    handleFetchList(
      searchTerm,
      diet,
      intolerances,
      value,
      order ? "asc" : "desc"
    );
  };

  return (
    <Grid container>
      <Grid item xxs={12} sm={12} md={12}>
        <div className={classes.formControl}>
          <FormControl>
            <Grid item xxs={6} sm={6} md={6}>
              <SearchBarInput />
            </Grid>
            <Grid item xxs={12} sm={12} md={12}>
              <FilterCheckDiet />
              <FilterCheckIntolerances />
            </Grid>
            <FilterRadioSorting />
            <Grid item xxs={12} sm={12} md={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handlerButton}
              >
                CoCo Search
              </Button>
            </Grid>
          </FormControl>
        </div>
      </Grid>
    </Grid>
  );
};

export default FormCon;
