import React from "react";
import { useState, useEffect, useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormContext } from "../../Context/FormContext";

const FilterCheckIntolerances = () => {
  const { search, setSearch } = useContext(FormContext);

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
    setSearch({ ...search, intolerances: int });
  }, [checkBoxIntolerances]);
  return (
    <div>
      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={Gluten}
                onChange={handleChangeIntolerances}
                name="Gluten"
                color="primary"
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
                color="primary"
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
                color="primary"
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
                color="primary"
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
                color="primary"
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
