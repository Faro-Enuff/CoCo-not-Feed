import React, { useContext } from "react";
import { FormContext } from "../../Context/FormContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DialogRadio from "./DialogRadio";
import DialogCheckDiet from "./DialogCheckDIet";
import DialogCheckIntolerances from "./DialogCheckIntolerance";
import SearchBarInput from "./SearchBarInput";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import logo from "./logo.jpg";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((muiTheme) => ({
  heading: {
    margin: "5%",
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
    minWidth: "90%",
    marginBottom: "20%",
    fontWeight: "bold",
    borderRadius: 25,
    opacity: 0.8,
  },
}));

const FormCon = ({ handleFetchList }) => {
  const classes = useStyles();

  const { search } = useContext(FormContext);

  const handlerButton = () => {
    handleFetchList(search);
  };
  console.log(search);
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
                <Typography variant="h5">My</Typography>
                <Typography variant="h3">
                  <strike>CoConot</strike>{" "}
                </Typography>
                <Typography variant="h5">Feed</Typography>
                <div className={classes.logoPosition}>
                  <Avatar
                    alt="logo"
                    src={logo}
                    className={classes.logo}
                    variant="circular"
                  />
                </div>
              </div>

              <SearchBarInput />
              <DialogCheckDiet />
              <DialogCheckIntolerances />
              <DialogRadio />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.btn}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={handlerButton}
                  className={classes.btn}
                  size="large"
                >
                  CoCo Search
                </Button>
              </div>
            </Grid>
          </Grid>
        </FormControl>
      </div>
    </Container>
  );
};

export default FormCon;
