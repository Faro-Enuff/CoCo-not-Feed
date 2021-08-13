import Home from "./ScreenView/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailedRecipe from "./ScreenView/DetailedRecipe";
import Navbar from "./Components/Navbar";
import Profile from "./ScreenView/Profile";
import Definitions from "./ScreenView/Definitions";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/recipe/:id" exact component={DetailedRecipe} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/definitions" exact component={Definitions} />>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
