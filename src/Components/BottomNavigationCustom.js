import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    backgroundColor: "rgb(B9B9B9)",
  },
});

const BottomNavigationCustom = () => {
  let history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goBack = () => {
    history.goBack();
  };
  const goPage = (page) => {
    history.push(page);
  };
  return (
    <Grid container>
      <Grid item xxs={12} sm={12} md={12}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className={classes.root}
        >
          <BottomNavigationAction
            label="Return"
            value="return"
            icon={<ArrowBackIcon />}
            onClick={goBack}
          />
          <BottomNavigationAction
            label="Home"
            value="/"
            icon={<HomeIcon />}
            onClick={() => goPage("/")}
          />
          <BottomNavigationAction
            label="Profile"
            value="/profile"
            icon={<AccountCircleIcon />}
            onClick={() => goPage("/profile")}
          />
        </BottomNavigation>
      </Grid>
    </Grid>
  );
};

export default BottomNavigationCustom;
