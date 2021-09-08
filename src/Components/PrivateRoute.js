const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.log("rest :>> ", rest);
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
