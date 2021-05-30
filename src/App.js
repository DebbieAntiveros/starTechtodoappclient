import React, { useContext, useEffect } from "react";
import { Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import "./App.css"; //Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
// import "jquery/dist/jquery.min.js"; //Datatable Modules
// import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
// import $ from "jquery";
import ListTodos from "./components/ListTodos";
import Login from "./Login";
import Register from "./Register";
import { AuthContext } from "./context/AuthProvider";
import Header from "./components/Header";
import Users from "./components/Users";

function App() {
  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("user info changed: ", loggedUser);
  }, [loggedUser]);

  return (
    <div className="container">
      <Header />
      {loggedUser != null ? (
        <Switch>
          <Route path="/dashboard" component={ListTodos}></Route>
          <Route exact path="/users" component={Users}></Route>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/sign-up" component={Register}></Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
