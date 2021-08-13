import { Link, useHistory } from "react-router-dom";
const Navbar = () => {
  let history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  console.log(history);
  return (
    <nav className="navbar">
      <h1>My CoCo(not) Feed</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/recipe/:id">Detailed Recipe</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/definitions">Definitions</Link>
      </div>
      <button onClick={goBack}>Back</button>
    </nav>
  );
};

export default Navbar;
