import Home from "./ScreenView/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailedRecipe from "./ScreenView/DetailedRecipe";
import Profile from "./ScreenView/Profile";
import Definitions from "./ScreenView/Definitions";
import { FormContextProvider } from "./Context/FormContext";
import { AuthContextProvider } from "./Context/authContext";
import PaginationRecipes from "./ScreenView/PaginationRecipes";
import SignUp from "./Components/auth/SignUp";
import { makeStyles } from "@material-ui/core/styles";
import SignIn from "./Components/auth/SignIn";
import BottomNavigationCustom from "./Components/nav/BottomNavigationCustom";
import { ThemeProvider } from "./Context/themeContext";

const useStyles = makeStyles((muiTheme) => ({
  content: {
    backgroundColor: "#efebe9",
    minHeight: "100%",
    paddingLeft: 0,
    paddingRight: 0,
    width: "100%",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider>
        <AuthContextProvider>
          <FormContextProvider>
            <div className="App">
              <div className={classes.content}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/recipes" exact component={PaginationRecipes} />
                  <Route path="/recipe/:id" component={DetailedRecipe} />
                  <Route path="/profile" exact component={Profile} />
                  <Route path="/definitions" exact component={Definitions} />
                  <Route path="/signup" exact component={SignUp} />
                  <Route path="/signin" exact component={SignIn} />
                </Switch>
              </div>
              <BottomNavigationCustom />
            </div>
          </FormContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
