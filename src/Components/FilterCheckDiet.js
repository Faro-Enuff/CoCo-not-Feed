import React from "react";
import { useState, useEffect, useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormContext } from "../Context/FormContext";

const FilterCheckDiet = () => {
  const { diet, setDiet } = useContext(FormContext);

  const [checkBoxDiet, setCheckBoxDiet] = useState({
    Vegan: false,
    Vegetarian: false,
    Pescetarian: false,
    Paleo: false,
  });

  const handleChangeDiet = (event) => {
    setCheckBoxDiet({
      ...checkBoxDiet,
      [event.target.name]: event.target.checked,
    });
  };

  const { Vegan, Vegetarian, Pescetarian, Paleo } = checkBoxDiet;

  useEffect(() => {
    const di = Object.keys(checkBoxDiet)
      .filter((property) => checkBoxDiet[property])
      .join(",");
    setDiet(di);
  }, [checkBoxDiet]);

  return (
    <div>
      <FormControl>
        <FormLabel>Diet</FormLabel>
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
    </div>
  );
};

export default FilterCheckDiet;
