import React, { useState, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { IconButton } from "@material-ui/core";
import { CommentContext } from "../../Context/commentContext";

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
    borderColor: theme.palette.primary.main,
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
    color: theme.palette.primary.contrastText,
  },
}));
const CommentTextfield = ({ recipeTitle, recipeId }) => {
  const classes = useStyles();
  const { writeNewComment } = useContext(CommentContext);
  const [body, setBody] = useState("");

  const handleOnChange = (e) => {
    setBody(e.target.value);
  };

  const handleWriteComment = () => {
    writeNewComment(recipeId, recipeTitle, body);
  };
  console.log(recipeTitle, recipeId);
  console.log(typeof recipeId);
  console.log(typeof recipeTitle);
  console.log(body);

  return (
    <div className={classes.root}>
      <FormControl className={classes.form}>
        <CssTextField
          className={classes.margin}
          InputProps={{ classes: { notchedOutline: classes.notchedOutline } }}
          id="body"
          label="Add a comment..."
          onChange={handleOnChange}
          value={body}
          variant="outlined"
          color="primary"
          fullWidth
          required
        ></CssTextField>
      </FormControl>
      <IconButton onClick={handleWriteComment}>Post</IconButton>
    </div>
  );
};

export default CommentTextfield;
