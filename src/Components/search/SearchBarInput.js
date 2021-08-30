import React from "react";
import { useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { FormContext } from "../../Context/FormContext";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      borderWidth: 6,
    },
    "& .MuiInput-underline:after": {},
    // "&:hover fieldset": {
    //   borderColor: "white",
    // },
    // "&.Mui-focused fieldset": {
    //   borderColor: "yellow",
    // },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#a1887f",
    fontSize: 18,
  },
  root: {
    display: "flex",
    width: "100%",
    margin: "0",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  margin: {
    width: "100%",
    fontWeight: "bold",
  },
}));

const SearchBarInput = ({ handleFetchList }) => {
  const classes = useStyles();
  const { search, setSearch } = useContext(FormContext);

  const handleSearch = (event) => {
    setSearch({ ...search, [event.target.name]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.form}>
        <CssTextField
          className={classes.margin}
          InputProps={{ classes: { notchedOutline: classes.notchedOutline } }}
          id="searchRecipe"
          label="Enter 3 ingredients (cheese, onion..)"
          onChange={handleSearch}
          name="searchTerm"
          value={search.searchTerm}
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
