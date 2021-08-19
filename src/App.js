import Home from "./ScreenView/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailedRecipe from "./ScreenView/DetailedRecipe";
import Navbar from "./Components/Navbar";
import Profile from "./ScreenView/Profile";
import Definitions from "./ScreenView/Definitions";
import { FormContextProvider } from "./Context/FormContext";
import PaginationRecipes from "./ScreenView/PaginationRecipes";
import BottomNavigationCustom from "./Components/BottomNavigationCustom";

function App() {
  return (
    <Router>
      <FormContextProvider>
        <div className="App">
          <div className="content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/recipes" exact component={PaginationRecipes} />
              <Route path="/recipe/:id" component={DetailedRecipe} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/definitions" exact component={Definitions} />
            </Switch>
          </div>
          <BottomNavigationCustom />
        </div>
      </FormContextProvider>
    </Router>
  );
}

export default App;
