import Home from "./ScreenView/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailedRecipe from "./ScreenView/DetailedRecipe";
import Navbar from "./Components/Navbar";
import Profile from "./ScreenView/Profile";
import Definitions from "./ScreenView/Definitions";
import { FormContextProvider } from "./Context/FormContext";
import PaginationRecipes from "./ScreenView/PaginationRecipes";

function App() {
  return (
    <Router>
      <FormContextProvider>
        <div className="App">
          <Navbar />
          <div className="content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/recipes" exact component={PaginationRecipes} />
              <Route path="/recipe/:id" component={DetailedRecipe} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/definitions" exact component={Definitions} />
            </Switch>
          </div>
        </div>
      </FormContextProvider>
    </Router>
  );
}

export default App;
