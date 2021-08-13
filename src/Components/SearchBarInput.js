import React from "react";
// import { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FilterCheck from "./FilterCheck";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgb(108, 25, 116)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(108, 25, 116)",
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  margin: {
    margin: theme.spacing(2),
    fontWeight: "bold",
  },
}));

const SearchBarInput = ({
  handleSearch,
  searchTerm,
  handleFetchList,
  handleChangeDiet,
  checkBoxDiet,
  handleChangeIntolerances,
  checkBoxIntolerances,
}) => {
  const classes = useStyles();
  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleFetchList();
    }
  };
  return (
    <div className={classes.root}>
      <CssTextField
        className={classes.margin}
        id="searchRecipe"
        label="Enter 3 ingredients (cheese, onion..)"
        onChange={handleSearch}
        onKeyUp={handleKeyUp}
        value={searchTerm}
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <FilterCheck
        handleChangeDiet={handleChangeDiet}
        checkBoxDiet={checkBoxDiet}
        handleChangeIntolerances={handleChangeIntolerances}
        checkBoxIntolerances={checkBoxIntolerances}
      />
      <Button variant="contained" color="secondary" onClick={handleFetchList}>
        CoCo Search
      </Button>
    </div>
  );
};

export default SearchBarInput;
