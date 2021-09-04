import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import AppBar from "@material-ui/core/AppBar";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { AuthContext } from "../../Context/authContext";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#a1887f",
  },
  navigation: {
    width: "100%",
  },
  appBar: {
    top: "auto",
    position: "fixed",
    bottom: "0%",
    fontWeight: "bold",
  },
});

const BottomNavigationCustom = () => {
  let history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState("recents");

  const { user } = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goBack = () => {
    history.goBack();
    setTimeout(() => {
      setValue("recents");
    }, 1500);
  };
  const goPage = (page) => {
    history.push(page);
    setTimeout(() => {
      setValue("recents");
    }, 1500);
  };
  console.log(`user`, user?.uid);
  return (
    <Container component="main" maxWidth="xs">
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.navigation}>
            <AppBar
              position="fixed"
              color="secondary"
              className={classes.appBar}
              classes={{}}
            >
              <BottomNavigation
                value={value}
                onChange={handleChange}
                className={classes.root}
              >
                <BottomNavigationAction
                  label="Return"
                  value="return"
                  style={{ color: " #fff" }}
                  icon={<ArrowBackIcon style={{ fill: "#fff" }} />}
                  onClick={goBack}
                />
                <BottomNavigationAction
                  label="Home"
                  value="/"
                  style={{ color: " #fff" }}
                  icon={<HomeIcon style={{ fill: "#fff" }} />}
                  onClick={() => goPage("/")}
                />
                <BottomNavigationAction
                  label="Profile"
                  value="/profile"
                  style={{ color: " #fff" }}
                  icon={<AccountCircleIcon style={{ fill: "#fff" }} />}
                  onClick={() => goPage("/profile")}
                />
              </BottomNavigation>
            </AppBar>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BottomNavigationCustom;
