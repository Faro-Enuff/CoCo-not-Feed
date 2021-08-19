import React, { useContext, useState } from "react";
import { FormContext } from "../Context/FormContext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const FilterRadioSorting = () => {
  const { value, setValue, order, setOrder } = useContext(FormContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleOrder = () => {
    setOrder((prevOrder) => !prevOrder);
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        Sorting Preference{" "}
        {
          <IconButton onClick={handleOrder}>
            {order ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        }
      </FormLabel>
      <RadioGroup
        row
        aria-label="preferences"
        name="preference1"
        value={value}
        onChange={handleChange}
        defaultValue="popularity"
      >
        <FormControlLabel
          value="popularity"
          control={<Radio color="primary" />}
          label="Popularity"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="healthiness"
          control={<Radio color="primary" />}
          label="Healthiness"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="calories"
          control={<Radio color="primary" />}
          label="Calories"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default FilterRadioSorting;
