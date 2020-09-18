import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { withCookies } from "react-cookie";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/login"
          render={() => <Login cookies={this.props.cookies} />}
        />
      </Router>
    );
  }
}

export default withCookies(Routes);
