import React, { useState, useContext, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import CommentTextfield from "../Components/comment/CommentTextfield";

const useStyles = makeStyles((muiTheme) => ({
  flexContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  commentTextfield: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
  },
}));

const Comments = ({ recipeTitle, recipeId }) => {
  const classes = useStyles();
  console.log("Entered");
  return (
    <div className={classes.flexContainer}>
      <Typography variant="h4">Comments</Typography>
      <div className={classes.commentTextfield}>
        <CommentTextfield recipeTitle={recipeTitle} recipeId={recipeId} />
      </div>
    </div>
  );
};

export default Comments;
