import React, { useState, useContext, useEffect, useRef } from "react";
import { Avatar, makeStyles, Paper, Typography } from "@material-ui/core";
import CommentTextfield from "../Components/comment/CommentTextfield";
import { CommentContext } from "../Context/commentContext";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    left: 0,
  },
  commentsContainer: {
    position: "fixed",
    left: 0,
    overflow: "hidden",
    height: "65%",
    bottom: "15%",
    width: "100%",
    overflowY: "auto",
  },
  commentElements: {
    display: "flex",
    flexDirection: "column",
  },
  comments: {
    backgroundColor: theme.palette.primary.light,
    margin: "1%",
    padding: "5%",
    borderRadius: "20%",
    height: "auto",
  },
  commentTextfield: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    position: "fixed",
    bottom: 0,
    left: 0,
    margin: "5%",
  },
  order: {
    display: "flex",
    overflow: "hidden",
    flexDirection: "row",
    margin: "5%",
  },
  userAvatar: {
    display: "flex",
    alignItems: "center",
    marginRight: "5%",
  },
  userComment: {
    width: "100%",
  },
}));

const Comments = ({ recipeTitle, recipeId }) => {
  const classes = useStyles();

  //Retrieving all Comments from the db
  const { commentCollection } = useContext(CommentContext);
  // console.log(commentCollection);

  // Make the scroll from bottom to top
  const dummy = useRef(null);
  const scrollToBottom = () => {
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  });

  // console.log("Entered");

  return (
    <div className={classes.flexContainer}>
      <Typography variant="h5">Comments</Typography>
      <div className={classes.commentsContainer}>
        {commentCollection?.map((comment) => (
          <div className={classes.order}>
            <div className={classes.userAvatar}>
              <Avatar></Avatar>
            </div>
            <div className={classes.userComment}>
              <Paper className={classes.comments}>
                <div className={classes.commentElements}>
                  <div>
                    <Typography variant="h6">{comment.name}</Typography>
                    <Typography variant="body3">
                      {moment(comment.timestamp.toString()).fromNow()}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body1">{comment.text}</Typography>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        ))}
        <div ref={dummy} />
      </div>
      <div className={classes.commentTextfield}>
        <CommentTextfield recipeTitle={recipeTitle} recipeId={recipeId} />
      </div>
    </div>
  );
};

export default Comments;