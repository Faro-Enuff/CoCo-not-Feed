import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FilterRadioSorting from "./FilterRadioSorting";
import Slide from "@material-ui/core/Slide";

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
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogRadio = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  //Small hack to change button color (preSelected value = popularity, so cant check search for it)
  const [color, setColor] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setColor(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.dialog}>
      <Button
        variant="outlined"
        color={color ? "primary" : "secondary"}
        onClick={handleClickOpen}
        size="large"
        className={classes.btn}
      >
        Preference
      </Button>
      <Dialog
        open={open}
        fullWidth={true}
        TransitionComponent={Transition}
        onClose={handleClose}
        classes={{ paper: classes.popup }}
      >
        <DialogTitle id="form-dialog-title" style={{ color: "#fff" }}>
          Preferences
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#fff" }}>
            Please Select your preference to sort.
          </DialogContentText>
          <FilterRadioSorting />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogRadio;
