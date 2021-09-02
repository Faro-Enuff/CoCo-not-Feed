import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CommentIcon from "@material-ui/icons/Comment";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Comments from "../../ScreenView/Comments";

const useStyles = makeStyles((muiTheme) => ({
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(recipeTitle, recipeId);
  return (
    <div className={classes.dialog}>
      <IconButton color="primary" variant="outlined" onClick={handleClickOpen}>
        <CommentIcon />
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
        <DialogTitle id="form-dialog-title">Comments</DialogTitle>
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
