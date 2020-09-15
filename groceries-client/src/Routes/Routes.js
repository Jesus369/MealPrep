import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Register from "./Register/Register";
import Login from "./Login/Login";
export default () => (
  <Router>
    <Route exact path="/home" component={Homepage} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
  </Router>
);
