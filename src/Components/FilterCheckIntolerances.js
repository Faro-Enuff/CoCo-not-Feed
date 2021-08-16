import React from "react";
import { useState, useEffect, useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormContext } from "../Context/FormContext";

const FilterCheckIntolerances = () => {
  const { intolerances, setIntolerances } = useContext(FormContext);

  const [checkBoxIntolerances, setCheckBoxIntolerances] = useState({
    Gluten: false,
    Dairy: false,
    Peanut: false,
    Soy: false,
    Egg: false,
  });

  const handleChangeIntolerances = (event) => {
    setCheckBoxIntolerances({
      ...checkBoxIntolerances,
      [event.target.name]: event.target.checked,
    });
  };

  const { Gluten, Dairy, Peanut, Soy, Egg } = checkBoxIntolerances;

  useEffect(() => {
    const int = Object.keys(checkBoxIntolerances)
      .filter((property) => checkBoxIntolerances[property])
      .join(",");
    setIntolerances(int);
  }, [checkBoxIntolerances]);
  return (
    <div>
      <FormControl>
        <FormLabel>Intolerances</FormLabel>
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

export default FilterCheckIntolerances;
