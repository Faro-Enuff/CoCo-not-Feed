import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
// Internal Imports
import Comments from "../../ScreenView/Comments";
import { CommentContext } from "../../Context/commentContext";
// Icons
import CommentIcon from "@material-ui/icons/Comment";
import CloseIcon from "@material-ui/icons/Close";
// Core Imports
import {
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
} from "@material-ui/core";

const useStyles = makeStyles((muiTheme) => ({
  heading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5%",
  },
  btn: {
    borderWidth: 3,
  },
  dialog: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    minHeight: "100%",
    padding: 0,
    margin: 0,
    backgroundColor: "#bcaaa4",
    color: "#fff",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CommentDialog = ({ recipeTitle, recipeId }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const { commentCollection } = useContext(CommentContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.dialog}>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        {commentCollection && commentCollection[0].title === recipeTitle ? (
          <CommentIcon color="primary" />
        ) : (
          <CommentIcon />
        )}
      </IconButton>
      <Dialog
        open={open}
        fullWidth={true}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.popup }}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <div className={classes.heading}>
          <Typography variant="h4" style={{ paddingBottom: "3%" }}>
            Comments
          </Typography>
          <Typography variant="h5">{recipeTitle}</Typography>
        </div>
        <DialogContent>
          {/* <DialogContentText style={{ color: "#fff" }}>
            Please Select your current diet.
          </DialogContentText> */}
          <Comments recipeTitle={recipeTitle} recipeId={recipeId} />
          {/* <FilterCheckDiet /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentDialog;
