import React from "react";
import { useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { FormContext } from "../Context/FormContext";

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

const SearchBarInput = ({ handleFetchList }) => {
  const classes = useStyles();
  const { searchTerm, setSearchTerm } = useContext(FormContext);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // const handleKeyUp = (e) => {
  //   e.preventDefault();
  //   if (e.key === "Enter") {
  //     handleFetchList();
  //   }
  // };

  return (
    <div className={classes.root}>
      <FormControl>
        <CssTextField
          className={classes.margin}
          id="searchRecipe"
          label="Enter 3 ingredients (cheese, onion..)"
          onChange={handleSearch}
          // onKeyUp={handleKeyUp}
          value={searchTerm}
          variant="outlined"
          color="secondary"
          fullWidth
          required
        />
      </FormControl>
    </div>
  );
};

export default SearchBarInput;
