import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Internal Imports
import { FormContext } from "../../Context/FormContext";
import DialogRadio from "./DialogRadio";
import DialogCheckDiet from "./DialogCheckDIet";
import DialogCheckIntolerances from "./DialogCheckIntolerance";
import SearchBarInput from "./SearchBarInput";

// Image Imports
import logo from "./logo.jpg";

// Core Imports
import {
  Box,
  Grid,
  Container,
  FormControl,
  Button,
  Avatar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((muiTheme) => ({
  heading: {
    margin: "5%",
    textShadow: "2px 2px 2px #000000",
  },
  logoPosition: {
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: muiTheme.spacing(10),
    height: muiTheme.spacing(10),
  },
  paper: {
    textAlign: "center",
  },
  formControl: {
    width: "100%", // Fix IE 11 issue.
    padding: 0,
    margin: 0,
  },
  btn: {
    minWidth: "100%",
    fontWeight: "bold",
    borderRadius: 25,
    opacity: 0.8,
    textShadow: "1px 1px 1px #000000",
  },
  btnGrid: {
    marginBottom: "30%",
  },
}));

const FormCon = ({ handleFetchList }) => {
  const classes = useStyles();
  // useState from Context, which carries all the relevant search fields for the API search
  const { search } = useContext(FormContext);

  // Button & Enter to initialize the fetch with all search parameters
  const handleButtonClick = () => {
    handleFetchList(search);
  };
  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      handleFetchList(search);
    }
  };

  // Display the search Parameters in the console
  console.log(`search Parameters :>>`, search);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <FormControl className={classes.formControl}>
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={12}>
              <div className={classes.heading}>
                <Typography color="primary" variant="h5">
                  My
                </Typography>
                <Typography color="secondary" variant="h3">
                  <strike>CoConot</strike>{" "}
                </Typography>
                <Typography color="primary" variant="h5">
                  Feed
                </Typography>
                <div className={classes.logoPosition}>
                  <Avatar
                    alt="logo"
                    src={logo}
                    className={classes.logo}
                    variant="circular"
                  />
                </div>
              </div>
              {/*  */}
              {/* All Dialogs for Checkbox and Radios */}
              <SearchBarInput handleKeyEnter={handleKeyEnter} />
              <DialogCheckDiet />
              <DialogCheckIntolerances />
              <DialogRadio />
            </Grid>
            <Grid item xs={12} className={classes.btnGrid}>
              <div className={classes.btn}>
                <Box borderRadius={25} boxShadow={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={handleButtonClick}
                    className={classes.btn}
                    size="large"
                  >
                    CoCo Search
                  </Button>
                </Box>
              </div>
            </Grid>
          </Grid>
        </FormControl>
      </div>
    </Container>
  );
};

export default FormCon;
