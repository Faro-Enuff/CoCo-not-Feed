import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((muiTheme) => ({
  carousel: {
    width: "100%",
    height: "auto",
  },
  carouselInner: {
    height: "100%",
    width: "100%",
    display: "flex",
  },
  left: {
    flex: "10%",
    height: "auto",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    opacity: 0.2,
    borderRadius: 20,
  },
  center: {
    flex: "90%",
    height: "100%",
    margin: 20,
  },
  right: {
    flex: "10%",
    height: "auto",
    display: "grid",
    placeItems: "center",
    color: "#fff",
    cursor: "pointer",
    opacity: 0.2,
    borderRadius: 20,
  },
  title: {
    marginBottom: 20,
  },
}));

const Carousel = ({ item }) => {
  const classes = useStyles();
  // console.log(item);
  return (
    <div className={classes.carousel}>
      <div className={classes.carouselInner}>
        <div className={classes.left}>
          <ArrowBackIosIcon fontSize="small" color="secondary" />
        </div>
        <div className={classes.center}>
          <Typography variant="h6" className={classes.title}>
            Step {item.number}
          </Typography>

          <Typography variant="body1" className={classes.body}>
            {item.step}
          </Typography>
        </div>
        <div className={classes.right}>
          <ArrowForwardIosIcon fontSize="small" color="secondary" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
