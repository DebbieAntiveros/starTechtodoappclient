import React from "react";
import AuthProvider from "./context/AuthProvider";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function Main() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default Main;
