import React, { useContext } from "react";
import { FormContext } from "../../Context/FormContext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((muiTheme) => ({}));

const FilterRadioSorting = () => {
  const classes = useStyles();
  const { search, setSearch, order, setOrder } = useContext(FormContext);

  const handleChange = (event) => {
    setSearch({ ...search, [event.target.name]: event.target.value });
  };
  const handleOrder = () => {
    setOrder(!order);
  };
  // console.log(order);
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={{ color: "#fff" }}>
        Sorting Preference
        {
          <IconButton onClick={handleOrder}>
            {order ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        }
      </FormLabel>
      <RadioGroup
        aria-label="preferences"
        name="preference"
        value={search.preference}
        onChange={handleChange}
        defaultValue="popularity"
        className={classes.radioDirection}
        row
      >
        <FormControlLabel
          value="popularity"
          control={<Radio color="primary" />}
          label="Popularity"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="calories"
          control={<Radio color="primary" />}
          label="Calories"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="protein"
          control={<Radio color="primary" />}
          label="Potein"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="carbohydrates"
          control={<Radio color="primary" />}
          label="Carbs"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="total-fat"
          control={<Radio color="primary" />}
          label="Total Fat"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default FilterRadioSorting;
