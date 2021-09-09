import React, { useState, useEffect, useContext } from "react";
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
    marginBottom: "5%",
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
  //useState for the typing in the input field
  const [body, setBody] = useState("");
  //Sending and retrieving data form db
  const { writeNewComment, allocateComments } = useContext(CommentContext);

  //Input is updating the useState of a users comment every time it is typing
  const handleOnChange = (e) => {
    setBody(e.target.value);
  };
  //Sent the comment by submitting (Enter in this case) to the db firestore
  const handleKeyEnter = (e) => {
    e.preventDefault();
    if (e.key === "Enter") handleWriteComment();
  };
  //Sent the comment by using the button (Click in this case) to the db firestore
  const handleWriteComment = () => {
    writeNewComment(recipeId, recipeTitle, body);
    setBody("");
  };
  //Retrieving the data from Firestore with realtime updating
  useEffect(() => {
    allocateComments(recipeId);
  }, []);

  // console.log(recipeTitle, recipeId);
  // console.log(body);

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
          onKeyUp={handleKeyEnter}
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
