import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const FilterCheck = ({
  handleChangeDiet,
  checkBoxDiet,
  handleChangeIntolerances,
  checkBoxIntolerances,
}) => {
  const classes = useStyles();

  const { Vegan, Vegetarian, Pescetarian, Paleo } = checkBoxDiet;
  const { Gluten, Dairy, Peanut, Soy, Egg } = checkBoxIntolerances;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Diet</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={Vegan}
                onChange={handleChangeDiet}
                name="Vegan"
              />
            }
            label="Vegan"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Vegetarian}
                onChange={handleChangeDiet}
                name="Vegetarian"
              />
            }
            label="Vegetarian"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Pescetarian}
                onChange={handleChangeDiet}
                name="Pescetarian"
              />
            }
            label="Pescetarian"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Paleo}
                onChange={handleChangeDiet}
                name="Paleo"
              />
            }
            label="Paleo"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Intolerances</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={Gluten}
                onChange={handleChangeIntolerances}
                name="Gluten"
              />
            }
            label="Gluten"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Dairy}
                onChange={handleChangeIntolerances}
                name="Dairy"
              />
            }
            label="Dairy"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Peanut}
                onChange={handleChangeIntolerances}
                name="Peanut"
              />
            }
            label="Peanut"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Soy}
                onChange={handleChangeIntolerances}
                name="Soy"
              />
            }
            label="Soy"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Egg}
                onChange={handleChangeIntolerances}
                name="Egg"
              />
            }
            label="Egg"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default FilterCheck;
