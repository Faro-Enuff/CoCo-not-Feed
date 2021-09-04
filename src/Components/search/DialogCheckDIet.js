import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import FilterCheckDiet from "./FilterCheckDiet";
import { FormContext } from "../../Context/FormContext";

const useStyles = makeStyles((muiTheme) => ({
  btn: {
    borderWidth: 3,
  },
  dialog: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10%",
  },
  popup: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    minHeight: "40%",
    padding: 0,
    margin: 0,
    backgroundColor: "#bcaaa4",
    color: "#fff",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCheckDiet = () => {
  const classes = useStyles();
  const { search } = useContext(FormContext);
  const [open, setOpen] = useState(false);
  console.log(search.diet);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.dialog}>
      <Button
        variant="outlined"
        color={search.diet ? "primary" : "secondary"}
        onClick={handleClickOpen}
        size="large"
        className={classes.btn}
      >
        Diet
      </Button>
      <Dialog
        open={open}
        fullWidth={true}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.popup }}
      >
        <DialogTitle id="form-dialog-title">Diet</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#fff" }}>
            Please Select your current diet.
          </DialogContentText>
          <FilterCheckDiet />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogCheckDiet;
